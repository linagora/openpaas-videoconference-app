const defaults = {
  OPENPAAS_URL: process.env.VUE_APP_OPENPAAS_URL || "http://localhost:8080",
  VUE_APP_AUTH: "basic",
  VUE_APP_JITSI_NO_SSL: true
};

const settings = { ...defaults, ...window.openpaas };

export default settings;
