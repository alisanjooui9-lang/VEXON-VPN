"use strict";

/*
 * VEXON VPN — Server Registry
 * این فایل اطلاعات سرورها را مدیریت می‌کند.
 * سرورهای نمونه تا زمان پیکربندی واقعی غیرفعال هستند.
 */

(function () {
  const VEXON_SERVERS = [
    {
      id: "server-01",
      name: "سرور ۱",
      location: "قابل تنظیم",
      protocol: "VLESS",
      address: "",
      port: 443,
      latency: null,
      enabled: false,
      status: "unconfigured"
    },
    {
      id: "server-02",
      name: "سرور ۲",
      location: "قابل تنظیم",
      protocol: "VMess",
      address: "",
      port: 443,
      latency: null,
      enabled: false,
      status: "unconfigured"
    },
    {
      id: "server-03",
      name: "سرور ۳",
      location: "قابل تنظیم",
      protocol: "WireGuard",
      address: "",
      port: 51820,
      latency: null,
      enabled: false,
      status: "unconfigured"
    }
  ];

  function getServers() {
    return VEXON_SERVERS.map(server => ({ ...server }));
  }

  function getServerById(id) {
    const server = VEXON_SERVERS.find(item => item.id === id);
    return server ? { ...server } : null;
  }

  function getAvailableServers() {
    return VEXON_SERVERS
      .filter(server =>
        server.enabled &&
        Boolean(server.address) &&
        server.status !== "unconfigured"
      )
      .map(server => ({ ...server }));
  }

  function updateServerStatus(id, status, latency = null) {
    const server = VEXON_SERVERS.find(item => item.id === id);

    if (!server) {
      return { success: false, error: "SERVER_NOT_FOUND" };
    }

    const allowedStatuses = [
      "online",
      "offline",
      "unconfigured",
      "maintenance"
    ];

    if (!allowedStatuses.includes(status)) {
      return { success: false, error: "INVALID_STATUS" };
    }

    if (
      latency !== null &&
      (!Number.isFinite(latency) || latency < 0)
    ) {
      return { success: false, error: "INVALID_LATENCY" };
    }

    server.status = status;
    server.latency = latency;

    return {
      success: true,
      server: { ...server }
    };
  }

  function selectBestServer() {
    const available = VEXON_SERVERS.filter(server =>
      server.enabled &&
      Boolean(server.address) &&
      server.status === "online" &&
      Number.isFinite(server.latency)
    );

    if (available.length === 0) {
      return null;
    }

    return {
      ...available.reduce((best, current) =>
        current.latency < best.latency ? current : best
      )
    };
  }

  const api = Object.freeze({
    getServers,
    getServerById,
    getAvailableServers,
    updateServerStatus,
    selectBestServer
  });

  if (typeof window !== "undefined") {
    window.VEXON_SERVERS = api;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
