const defaults = {
  OPENPAAS_URL: process.env.VUE_APP_OPENPAAS_URL || "http://localhost:8080"
};

const settings = { ...defaults, ...window.openpaas };

export default settings;
