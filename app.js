"use strict";

/*

* VEXON VPN — UI controller
* نسخه فعلی فقط رابط کاربری را مدیریت می‌کند.
* این کد اتصال واقعی VPN ایجاد نمی‌کند.
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

function notify(message) {
let toast = document.getElementById("vexon-toast");

if (!toast) {
  toast = document.createElement("div");
  toast.id = "vexon-toast";
  toast.setAttribute("role", "status");

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
    font: "14px sans-serif",
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

function getElement(...selectors) {
for (const selector of selectors) {
const element = document.querySelector(selector);
if (element) return element;
}
return null;
}

function updateConnectionLabel() {
const status = getElement(
"#connection-status",
"[data-connection-status]"
);

if (!status) return;

if (state.connecting) {
  status.textContent = "در حال آماده‌سازی";
} else if (state.connected) {
  status.textContent = "متصل";
} else {
  status.textContent = "متصل نیست";
}

}

function startConnection() {
if (state.connecting) return;

notify(
  "اتصال واقعی هنوز راه‌اندازی نشده است. ابتدا باید موتور VPN و سرور تنظیم شوند."
);

updateConnectionLabel();

}

function disconnect() {
state.connected = false;
state.connecting = false;
updateConnectionLabel();

notify("در نسخه فعلی اتصال واقعی برای قطع‌کردن وجود ندارد.");

}

function selectServer(serverId, serverName) {
state.selectedServerId = serverId;

if (serverName) {
  notify("سرور انتخاب‌شده: " + serverName);
} else {
  notify("سرور انتخاب شد.");
}

}

function importConfig() {
notify(
"واردکردن کانفیگ تا زمان پیاده‌سازی امن و واقعی این قابلیت غیرفعال است."
);
}

function activateSubscription() {
notify(
"فعال‌سازی کد اشتراک به سرور امن و سامانه اعتبارسنجی نیاز دارد."
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
  activateButton.addEventListener("click", activateSubscription);
}

updateConnectionLabel();

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
