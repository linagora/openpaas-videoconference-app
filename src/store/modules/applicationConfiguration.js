const state = {
  baseUrl: process.env.VUE_APP_OPENPAAS_URL || "http://localhost:8080",
  jitsiToolbarButtons: JSON.parse(process.env.VUE_APP_JITSI_TOOLBAR_BUTTONS) || undefined
};

export default { namespaced: true, state };
