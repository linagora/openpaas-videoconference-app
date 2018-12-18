import Vue from "vue";

const state = {
  snackbar: {
    color: "red",
    message: null,
    timeout: 5000
  },
  takingTimeTimeout: parseInt(process.env.VUE_APP_JITSI_TAKING_TIME_TIMEOUT, 10),
  conferenceServerTimeout: parseInt(process.env.VUE_APP_JITSI_CONFERENCE_SERVER_TIMEOUT, 10),
  conferenceState: undefined
};

export const conferenceStates = Object.freeze({
  LOADING: "LOADING",
  LOADED: "LOADED",
  TAKING_TIME: "TAKING_TIME",
  TIMED_OUT: "TIMED_OUT",
  CALL_ENDED: "CALL_ENDED"
});

export const types = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  TAKING_TIME_TIMEOUT: "TAKING_TIME_TIMEOUT",
  CONFERENCE_SERVER_TIMEOUT: "CONFERENCE_SERVER_TIMEOUT",
  CONFERENCE_STATE: "CONFERENCE_STATE"
};

const actions = {
  displaySnackbar({ commit }, snackbar) {
    commit(types.SHOW_SNACKBAR, snackbar);
  }
};

const mutations = {
  [types.SHOW_SNACKBAR](state, snackbar) {
    snackbar.show = true;
    Vue.set(state, "snackbar", snackbar);
  },
  [types.TAKING_TIME_TIMEOUT](state, newTimeout) {
    state.takingTimeTimeout = newTimeout;
  },
  [types.CONFERENCE_SERVER_TIMEOUT](state, newTimeout) {
    state.conferenceServerTimeout = newTimeout;
  },
  [types.CONFERENCE_STATE](state, newConferenceState) {
    state.conferenceState = newConferenceState;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
