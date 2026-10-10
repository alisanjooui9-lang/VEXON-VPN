/*

* VEXON VPN
* Central application configuration
* 
* این فایل فقط تنظیمات رابط کاربری را نگه می‌دارد.
* هنوز به سرور واقعی VPN یا سیستم اشتراک متصل نیست.
  */

const VEXON_CONFIG = Object.freeze({
app: {
name: "VEXON VPN",
version: "0.1.0",
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
neverStoreSubscriptionCodesInBrowser: true
},

features: {
serverSelection: true,
importConfigFromText: true,
importConfigFromFile: true,
importConfigFromQR: true,
subscriptionActivation: false,
realVpnConnection: false
}
});

if (typeof window !== "undefined") {
window.VEXON_CONFIG = VEXON_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
module.exports = VEXON_CONFIG;
}
