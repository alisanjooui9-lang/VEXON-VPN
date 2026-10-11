"use strict";

/*

* VEXON VPN — Application Controller
* این فایل رابط کاربری را مدیریت می‌کند.
* اتصال واقعی VPN به موتور بومی اندروید نیاز دارد.
  */

(function () {
const config = window.VEXON_CONFIG || {
app: { name: "VEXON VPN", version: "0.1.0" }
};

const state = {
connected: false,
connecting: false,
selectedServerId: null
};

function getElement(...selectors) {
for (const selector of selectors) {
const element = document.querySelector(selector);
if (element) return element;
}
return null;
}

function notify(message) {
let toast = document.getElementById("vexon-toast");

if (!toast) {
  toast = document.createElement("div");
  toast.id = "vexon-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  Object.assign(toast.style, {
    position: "fixed",
    left: "16px",
    right: "16px",
    bottom: "28px",
    zIndex: "9999",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "#17243A",
    color: "#F4F7FF",
    border: "1px solid #20C8F5",
    font: "14px Tahoma, sans-serif",
    textAlign: "center",
    direction: "rtl",
    opacity: "0",
    transition: "opacity .2s ease"
  });

  document.body.appendChild(toast);
}

toast.textContent = message;
toast.style.opacity = "1";

clearTimeout(toast.hideTimer);

toast.hideTimer = setTimeout(() => {
  toast.style.opacity = "0";
}, 2800);

}

function updateConnectionUI() {
const status = getElement(
"#connection-status",
"[data-connection-status]"
);

const title = getElement("#connect-title");
const description = getElement("#connect-desc");
const area = getElement("#connect-area");
const pill = getElement("#status-pill");
const button = getElement("#connect-btn");

if (status) {
  status.textContent = state.connecting
    ? "در حال آماده‌سازی"
    : state.connected
      ? "متصل"
      : "متصل نیست";
}

if (title) {
  title.textContent = state.connected
    ? "اتصال برقرار است"
    : state.connecting
      ? "در حال اتصال"
      : "اتصال امن";
}

if (description && !state.connected && !state.connecting) {
  description.textContent =
    "سرور را انتخاب کن و کانفیگ معتبر وارد کن.";
}

if (area) {
  area.classList.toggle("busy", state.connecting);
}

if (pill) {
  pill.classList.toggle("connected", state.connected);
}

if (button) {
  button.setAttribute(
    "aria-label",
    state.connected ? "قطع اتصال" : "شروع اتصال"
  );
}

}

function selectServer(serverId, serverName) {
state.selectedServerId = serverId || null;

notify(
  serverName
    ? "سرور انتخاب‌شده: " + serverName
    : "سرور انتخاب شد."
);

}

function startConnection() {
if (state.connecting) return;

if (state.connected) {
  disconnect();
  return;
}

notify(
  "اتصال واقعی هنوز فعال نیست؛ ابتدا باید موتور VPN راه‌اندازی شود."
);

updateConnectionUI();

}

function disconnect() {
state.connected = false;
state.connecting = false;

updateConnectionUI();

notify("اتصال واقعی فعالی برای قطع‌کردن وجود ندارد.");

}

function importConfig() {
notify(
"واردکردن کانفیگ هنوز پیاده‌سازی نشده است."
);
}

function activateSubscription() {
notify(
"فعال‌سازی اشتراک به سرویس سمت سرور نیاز دارد."
);
}

function initialize() {
document.title = config.app.name || "VEXON VPN";

const connectButton = getElement(
  "#connect-btn",
  "#connectButton",
  "[data-action='connect']"
);

const disconnectButton = getElement(
  "#disconnect-btn",
  "#disconnectButton",
  "[data-action='disconnect']"
);

const importButton = getElement(
  "#import-config-btn",
  "[data-action='import-config']"
);

const activateButton = getElement(
  "#activate-subscription-btn",
  "[data-action='activate-subscription']"
);

if (connectButton) {
  connectButton.addEventListener("click", startConnection);
}

if (disconnectButton) {
  disconnectButton.addEventListener("click", disconnect);
}

if (importButton) {
  importButton.addEventListener("click", importConfig);
}

if (activateButton) {
  activateButton.addEventListener(
    "click",
    activateSubscription
  );
}

updateConnectionUI();

console.info(
  config.app.name + " " + config.app.version + " initialized."
);

}

window.VEXON_APP = Object.freeze({
notify,
selectServer,
startConnection,
disconnect,
importConfig,
activateSubscription,
getState: () => ({ ...state })
});

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initialize);
} else {
initialize();
}
})();
