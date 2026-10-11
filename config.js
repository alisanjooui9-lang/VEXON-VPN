"use strict";

/*

* VEXON VPN
* تنظیمات اصلی برنامه
  */

const VEXON_CONFIG = Object.freeze({
app: {
name: "VEXON VPN",
version: "0.2.0",
language: "fa",
direction: "rtl"
},

theme: {
background: "#080D18",
surface: "#111A2A",
primary: "#20C8F5",
secondary: "#477BFF",
text: "#F4F7FF",
muted: "#8E9BB2",
success: "#28D99A",
warning: "#FFBD59",
error: "#FF667A"
},

connection: {
defaultServerId: null,
reconnectEnabled: false,
connectionTimeoutMs: 15000
},

security: {
requireServerVerification: true,
allowUnverifiedConfigs: false,
neverStoreSubscriptionCodesInBrowser: true,
neverLogConfigCredentials: true
},

features: {
serverSelection: true,
importConfigFromText: true,
importConfigFromFile: true,
importConfigFromQR: false,
subscriptionActivation: false,
realVpnConnection: false
},

configImport: {
allowedProtocols: [
"vless",
"vmess",
"trojan",
"ss"
],
maxFileSizeBytes: 1024 * 1024,
supportedFileExtensions: [
".txt",
".conf",
".json"
]
}
});

if (typeof window !== "undefined") {
window.VEXON_CONFIG = VEXON_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
module.exports = VEXON_CONFIG;
}
