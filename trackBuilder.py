from __future__ import annotations

import json
import re
from pathlib import Path


TRACKS_DIR = Path(__file__).resolve().parent / "tracks"


def parse_coordinate(raw_value: str) -> list[float]:
	parts = [part.strip() for part in raw_value.split(",")]
	if len(parts) != 2 or not parts[0] or not parts[1]:
		raise ValueError("Enter coordinates as latitude,longitude")

	latitude = float(parts[0])
	longitude = float(parts[1])
	return [latitude, longitude]


def slugify(value: str) -> str:
	slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
	return slug or "track"


def unique_track_path(track_name: str) -> Path:
	base_name = slugify(track_name)
	candidate = TRACKS_DIR / f"{base_name}.json"
	counter = 2

	while candidate.exists():
		candidate = TRACKS_DIR / f"{base_name}-{counter}.json"
		counter += 1

	return candidate


def prompt_non_empty(message: str) -> str:
	while True:
		value = input(message).strip()
		if value:
			return value
		print("Please enter a value.")


def prompt_coordinate(message: str) -> list[float] | None:
	while True:
		raw_value = input(message).strip()
		if raw_value == "":
			return None

		try:
			return parse_coordinate(raw_value)
		except ValueError as exc:
			print(exc)


def build_track() -> None:
	print("Track builder")
	print("Enter each coordinate as latitude,longitude")
	print("Press Enter on the alpha prompt to finish and save the track")
	print()

	track_name = prompt_non_empty("Track name: ")
	track_description = input("Track description: ").strip()

	gates: list[list[list[float]]] = []
	gate_number = 1

	while True:
		alpha = prompt_coordinate(f"Gate {gate_number} alpha (lat,lon) [Enter to finish]: ")
		if alpha is None:
			break

		beta = prompt_coordinate(f"Gate {gate_number} beta (lat,lon): ")
		while beta is None:
			print("Beta coordinate is required for a gate.")
			beta = prompt_coordinate(f"Gate {gate_number} beta (lat,lon): ")

		gates.append([alpha, beta])
		gate_number += 1
		print(f"Added gate {gate_number - 1}.")
		print()

	if not gates:
		raise SystemExit("No gates were added. Nothing was saved.")

	TRACKS_DIR.mkdir(parents=True, exist_ok=True)
	output_path = unique_track_path(track_name)

	track_data = {
		"name": track_name,
		"description": track_description,
		"coordinates": gates,
	}

	with output_path.open("w", encoding="utf-8") as file_handle:
		json.dump(track_data, file_handle, indent=4)
		file_handle.write("\n")

	print(f"Saved {len(gates)} gate(s) to {output_path}")


if __name__ == "__main__":
	build_track()
