from __future__ import annotations

import json
import math
import re
from pathlib import Path

import pandas as pd

try:
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle
except ImportError as exc:
    raise SystemExit(
        "matplotlib is required. Install the project dependencies first."
    ) from exc


try:
    import contextily as ctx
    from pyproj import Transformer
except ImportError:
    ctx = None
    Transformer = None


BASE_DIR = Path(__file__).resolve().parent
RUNS_DIR = BASE_DIR / "recordedRuns"
TRACKS_DIR = BASE_DIR / "tracks"
OUTPUT_DIR = BASE_DIR / "outputs"

MPS_TO_MPH = 2.2369362920544


def prompt_choice(header: str, paths: list[Path], default_index: int = 0) -> Path:
    print(header)
    for index, path in enumerate(paths, start=1):
        print(f"{index}. {path.name}")

    while True:
        raw_value = input(f"Choose a number (press Enter for {default_index + 1}): ").strip()
        choice_index = default_index if raw_value == "" else int(raw_value) - 1

        if 0 <= choice_index < len(paths):
            return paths[choice_index]

        print(f"Pick a number between 1 and {len(paths)}.")


def load_json_file(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as file_handle:
        return json.load(file_handle)


def get_run_file() -> Path:
    run_files = sorted(RUNS_DIR.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True)
    if not run_files:
        raise FileNotFoundError("No .json files found in recordedRuns/.")
    return prompt_choice("Available route files:", run_files)


def get_track_file() -> Path:
    track_files = sorted(TRACKS_DIR.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True)
    if not track_files:
        raise FileNotFoundError("No .json files found in tracks/.")
    return prompt_choice("Available track files:", track_files)


def parse_route_payload(payload: dict) -> pd.DataFrame:
    pings = payload.get("pings", [])
    if not pings:
        raise ValueError("The selected run file has no pings.")

    df = pd.DataFrame(pings)
    required = ["latitude", "longitude", "timestampIso"]
    missing = [column for column in required if column not in df.columns]
    if missing:
        raise KeyError(f"Missing required columns in export: {missing}")

    route_df = df.copy()
    route_df["timestamp"] = pd.to_datetime(route_df["timestampIso"], errors="coerce", utc=True)
    route_df = route_df.dropna(subset=["latitude", "longitude", "timestamp"])
    route_df = route_df.sort_values("timestamp").reset_index(drop=True)

    if len(route_df) < 2:
        raise ValueError("Need at least 2 valid points to analyze a route.")

    return route_df


def segment_intersection(p1, p2, q1, q2, eps=1e-12):
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = q1
    x4, y4 = q2

    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if abs(den) < eps:
        return None

    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den
    if t < -eps or t > 1 + eps or u < -eps or u > 1 + eps:
        return None

    ix = x1 + t * (x2 - x1)
    iy = y1 + t * (y2 - y1)
    return {"point": (ix, iy), "t": t, "u": u}


def interpolate_time(start_ts, end_ts, t):
    return start_ts + (end_ts - start_ts) * t


def build_gates(track_payload: dict) -> list[dict]:
    gates = []
    for gate_index, gate_pair in enumerate(track_payload.get("coordinates", []), start=1):
        if len(gate_pair) != 2:
            continue
        gates.append(
            {
                "gate_index": gate_index,
                "alpha": tuple(gate_pair[0]),
                "beta": tuple(gate_pair[1]),
            }
        )

    if not gates:
        raise ValueError("The selected track has no usable gate coordinates.")

    return gates


def detect_gate_crossings(route_df: pd.DataFrame, gates: list[dict]) -> pd.DataFrame:
    crossings = []

    for segment_index in range(1, len(route_df)):
        prev = route_df.iloc[segment_index - 1]
        curr = route_df.iloc[segment_index]
        racer_start = (float(prev.latitude), float(prev.longitude))
        racer_end = (float(curr.latitude), float(curr.longitude))

        for gate in gates:
            hit = segment_intersection(racer_start, racer_end, gate["alpha"], gate["beta"])
            if hit is None:
                continue

            crossings.append(
                {
                    "gate_index": gate["gate_index"],
                    "segment_index": segment_index,
                    "segment_start_time": prev.timestamp,
                    "segment_end_time": curr.timestamp,
                    "cross_time": interpolate_time(prev.timestamp, curr.timestamp, hit["t"]),
                    "cross_latitude": hit["point"][0],
                    "cross_longitude": hit["point"][1],
                    "segment_fraction": hit["t"],
                }
            )

    crossings_df = pd.DataFrame(crossings)
    if crossings_df.empty:
        return crossings_df

    return crossings_df.sort_values(["cross_time", "gate_index"]).reset_index(drop=True)


def haversine_m(lat1, lon1, lat2, lon2):
    radius_m = 6_371_000.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    return 2 * radius_m * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def enrich_route(route_df: pd.DataFrame) -> pd.DataFrame:
    segment_m = [0.0]
    for index in range(1, len(route_df)):
        prev = route_df.iloc[index - 1]
        curr = route_df.iloc[index]
        segment_m.append(haversine_m(prev.latitude, prev.longitude, curr.latitude, curr.longitude))

    route_df = route_df.copy()
    route_df["segment_m"] = segment_m
    route_df["cumulative_km"] = route_df["segment_m"].cumsum() / 1000
    return route_df


def print_run_summary(data_file: Path, track_file: Path, route_df: pd.DataFrame, crossings_df: pd.DataFrame, track_payload: dict) -> None:
    total_distance_km = route_df["cumulative_km"].iloc[-1]
    race_start_time = crossings_df.iloc[0]["cross_time"] if not crossings_df.empty else None
    race_finish_time = crossings_df.iloc[-1]["cross_time"] if not crossings_df.empty else None

    summary_rows = [
        ["Selected run", data_file.name],
        ["Selected track", track_file.name],
        ["Track name", track_payload.get("name", track_file.stem)],
        ["Ping count", len(route_df)],
        ["Run completion time", str(race_finish_time - race_start_time) if race_start_time is not None and race_finish_time is not None else "n/a"],
        ["Total distance (km)", f"{total_distance_km:.3f}"],
        ["Gate crossings", len(crossings_df)],
        ["Start time", race_start_time if race_start_time is not None else "n/a"],
        ["Finish time", race_finish_time if race_finish_time is not None else "n/a"],
    ]

    speed_series_mph = pd.Series(dtype=float)
    if "speed" in route_df.columns:
        speed_series_mph = pd.to_numeric(route_df["speed"], errors="coerce") * MPS_TO_MPH
    moving_speed_mph = speed_series_mph.dropna()
    moving_speed_mph = moving_speed_mph[moving_speed_mph > 0]

    speed_summary_rows = [
        ["Top speed (mph)", f"{moving_speed_mph.max():.2f}" if not moving_speed_mph.empty else "n/a"],
        ["Average speed (mph)", f"{moving_speed_mph.mean():.2f}" if not moving_speed_mph.empty else "n/a"],
        ["Slowest moving speed (mph)", f"{moving_speed_mph.min():.2f}" if not moving_speed_mph.empty else "n/a"],
    ]

    print()
    print("Summary")
    print("-------")
    for label, value in summary_rows:
        print(f"{label}: {value}")

    print()
    print("Moving speed stats")
    print("------------------")
    for label, value in speed_summary_rows:
        print(f"{label}: {value}")

    print()
    print("Route points")
    print("------------")
    display_columns = ["timestamp", "latitude", "longitude", "segment_m", "cumulative_km"]
    print(route_df[display_columns].head().to_string(index=False))

    if not crossings_df.empty:
        print()
        print("Gate crossings")
        print("---------------")
        print(
            crossings_df[[
                "gate_index",
                "segment_index",
                "cross_time",
                "cross_latitude",
                "cross_longitude",
                "segment_fraction",
            ]].to_string(index=False)
        )


def render_map(route_df: pd.DataFrame, gates: list[dict], track_payload: dict) -> None:
    route_lons = route_df["longitude"].to_numpy()
    route_lats = route_df["latitude"].to_numpy()
    all_lons = [*route_lons.tolist()]
    all_lats = [*route_lats.tolist()]
    for gate in gates:
        all_lats.extend([gate["alpha"][0], gate["beta"][0]])
        all_lons.extend([gate["alpha"][1], gate["beta"][1]])

    min_lon, max_lon = min(all_lons), max(all_lons)
    min_lat, max_lat = min(all_lats), max(all_lats)
    lon_pad = max((max_lon - min_lon) * 0.12, 0.001)
    lat_pad = max((max_lat - min_lat) * 0.12, 0.001)

    route_x = route_lons
    route_y = route_lats
    gate_coords = [((gate["alpha"][1], gate["alpha"][0]), (gate["beta"][1], gate["beta"][0])) for gate in gates]

    fig, ax = plt.subplots(figsize=(12, 10), facecolor="#0b1117")
    ax.set_facecolor("#0b1117")
    fig.subplots_adjust(left=0, right=1, bottom=0, top=1)
    ax.set_xlim(min_lon - lon_pad, max_lon + lon_pad)
    ax.set_ylim(min_lat - lat_pad, max_lat + lat_pad)
    ax.set_aspect("equal", adjustable="box")

    basemap_added = False
    if ctx is not None and Transformer is not None:
        try:
            transformer = Transformer.from_crs(4326, 3857, always_xy=True)
            x_min, y_min = transformer.transform(min_lon - lon_pad, min_lat - lat_pad)
            x_max, y_max = transformer.transform(max_lon + lon_pad, max_lat + lat_pad)
            ax.set_xlim(x_min, x_max)
            ax.set_ylim(y_min, y_max)
            route_x, route_y = transformer.transform(route_lons, route_lats)

            gate_coords = []
            for gate in gates:
                alpha_x, alpha_y = transformer.transform(gate["alpha"][1], gate["alpha"][0])
                beta_x, beta_y = transformer.transform(gate["beta"][1], gate["beta"][0])
                gate_coords.append(((alpha_x, alpha_y), (beta_x, beta_y)))

            carto_db = getattr(ctx.providers, "CartoDB", None)
            basemap_source = getattr(carto_db, "DarkMatter", None) if carto_db is not None else None
            if basemap_source is not None:
                ctx.add_basemap(ax, source=basemap_source)
                basemap_added = True
        except Exception:
            basemap_added = False

    if not basemap_added:
        ax.add_patch(
            Rectangle(
                (min_lon - lon_pad, min_lat - lat_pad),
                (max_lon - min_lon) + 2 * lon_pad,
                (max_lat - min_lat) + 2 * lat_pad,
                facecolor="#0b1117",
                edgecolor="#273744",
                linewidth=1,
                zorder=0,
            )
        )
        ax.grid(True, color="#1a2833", linewidth=0.8, alpha=0.8)

    ax.plot(route_x, route_y, color="#2f7bff", linewidth=2.5, zorder=3)
    ax.scatter(route_x, route_y, s=28, color="#2f7bff", edgecolors="#dbe8ff", linewidths=0.4, zorder=4)

    for index, (alpha_point, beta_point) in enumerate(gate_coords, start=1):
        if index == 1:
            gate_color = "#22c55e"
        elif index == len(gate_coords):
            gate_color = "#ef4444"
        else:
            gate_color = "#facc15"
        ax.plot([alpha_point[0], beta_point[0]], [alpha_point[1], beta_point[1]], color=gate_color, linewidth=3.5, zorder=2)
        ax.scatter([alpha_point[0], beta_point[0]], [alpha_point[1], beta_point[1]], s=48, color=gate_color, edgecolors="#0b1117", linewidths=0.6, zorder=5)

    ax.set_axis_off()
    ax.set_title("")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_name = f"route-map-{slugify(track_payload.get('name', 'track'))}.png"
    output_path = OUTPUT_DIR / output_name
    fig.savefig(output_path, dpi=200, bbox_inches="tight", pad_inches=0.02, facecolor=fig.get_facecolor())
    print(f"Saved map image to {output_path}")
    plt.show()


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return slug or "track"


def main() -> None:
    print("Route visualizer")
    print("----------------")
    print("This script will ask you for a run file and a track file, then show a map and summary.")
    print()

    data_file = get_run_file()
    track_file = get_track_file()

    print()
    print(f"Using run: {data_file.name}")
    print(f"Using track: {track_file.name}")

    route_payload = load_json_file(data_file)
    track_payload = load_json_file(track_file)

    route_df = enrich_route(parse_route_payload(route_payload))
    gates = build_gates(track_payload)
    crossings_df = detect_gate_crossings(route_df, gates)

    if crossings_df.empty:
        print()
        print("No gate crossings detected.")
    else:
        print()
        print(f"Detected {len(crossings_df)} gate crossing(s).")
        race_start_time = crossings_df.iloc[0]["cross_time"]
        race_finish_time = crossings_df.iloc[-1]["cross_time"]
        print(f"First crossing: {race_start_time}")
        print(f"Last crossing: {race_finish_time}")

    render_map(route_df, gates, track_payload)
    print_run_summary(data_file, track_file, route_df, crossings_df, track_payload)


if __name__ == "__main__":
    main()