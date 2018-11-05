const stripProtocol = urlString => urlString.replace(`${new URL(urlString).protocol}//`, "");

const state = {
  baseUrl: process.env.VUE_APP_OPENPAAS_URL || "http://localhost:8080",
  jitsiUrl: stripProtocol(process.env.VUE_APP_JITSI_URL || "http://localhost:8000"),
  jitsiToolbarButtons: JSON.parse(process.env.VUE_APP_JITSI_TOOLBAR_BUTTONS) || undefined,
  jitsiDefaultConferenceRoom: process.env.VUE_APP_JITSI_DEFAULT_CONFERENCE_ROOM
};

export default { namespaced: true, state };
