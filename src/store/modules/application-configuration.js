import ApplicationSettings from "@/settings";

const state = {
  baseUrl: ApplicationSettings.OPENPAAS_URL,
  jitsiToolbarButtons: JSON.parse(process.env.VUE_APP_JITSI_TOOLBAR_BUTTONS) || undefined
};

export default { namespaced: true, state };
