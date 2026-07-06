const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

const statusText = document.getElementById("statusText");
const pingCount = document.getElementById("pingCount");
const lastPing = document.getElementById("lastPing");
const pingTableBody = document.getElementById("pingTableBody");

let watchId = null;
let pings = [];

function setStatus(text) {
  statusText.textContent = text;
}

function setButtonsForRecording(isRecording) {
  startBtn.disabled = isRecording;
  stopBtn.disabled = !isRecording;
  saveBtn.disabled = pings.length === 0;
  clearBtn.disabled = pings.length === 0;
}

function formatCoordinate(value) {
  return Number(value).toFixed(6);
}

function formatNumber(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "n/a";
  }
  return Number(value).toFixed(digits);
}

function renderTable() {
  if (pings.length === 0) {
    pingTableBody.innerHTML = '<tr><td colspan="6" class="empty">No pings yet.</td></tr>';
    return;
  }

  const rows = pings.map((ping, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${ping.timestampIso}</td>
      <td>${formatCoordinate(ping.latitude)}</td>
      <td>${formatCoordinate(ping.longitude)}</td>
      <td>${formatNumber(ping.accuracy, 1)}</td>
      <td>${formatNumber(ping.speed, 2)}</td>
    </tr>
  `);

  pingTableBody.innerHTML = rows.join("");
}

function updateUiAfterPing() {
  const count = pings.length;
  pingCount.textContent = String(count);
  lastPing.textContent = count > 0 ? pings[count - 1].timestampIso : "None";
  saveBtn.disabled = count === 0;
  clearBtn.disabled = count === 0;
  renderTable();
}

function onPosition(position) {
  const ping = {
    timestampMs: position.timestamp,
    timestampIso: new Date(position.timestamp).toISOString(),
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    speed: position.coords.speed
  };

  pings.push(ping);
  updateUiAfterPing();
  setStatus("Recording");
}

function onPositionError(error) {
  setStatus(`Error (${error.code}): ${error.message}`);
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  setButtonsForRecording(false);
}

function startRecording() {
  if (!("geolocation" in navigator)) {
    setStatus("Geolocation API not supported on this device/browser.");
    return;
  }

  if (watchId !== null) {
    setStatus("Already recording.");
    return;
  }

  setStatus("Requesting location permission...");
  watchId = navigator.geolocation.watchPosition(onPosition, onPositionError, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  });

  setButtonsForRecording(true);
}

function stopRecording() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  setStatus("Stopped");
  setButtonsForRecording(false);
}

function downloadJson() {
  if (pings.length === 0) {
    return;
  }

  const payload = {
    exportedAtIso: new Date().toISOString(),
    totalPings: pings.length,
    pings
  };

  const jsonText = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonText], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `gps-pings-${timestamp}.json`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  setStatus(`Saved ${pings.length} pings to ${filename}`);
}

function clearPings() {
  pings = [];
  updateUiAfterPing();
  setStatus(watchId === null ? "Idle" : "Recording");
}

startBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);
saveBtn.addEventListener("click", downloadJson);
clearBtn.addEventListener("click", clearPings);

setButtonsForRecording(false);
updateUiAfterPing();
