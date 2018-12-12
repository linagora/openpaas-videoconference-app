import Vue from "vue";

const state = {
  jwtToken: localStorage.getItem("default_auth_token"),
  ready: null,
  sessionResolved: null,
  sessionRejected: null,
  justLogout: null
};

const types = {
  SET_JWT_TOKEN: "SET_JWT_TOKEN",
  SET_RESOLVED: "SET_RESOLVED",
  SET_REJECTED: "SET_REJECTED",
  INIT_READY: "INIT_READY",
  JUST_LOGOUT: "JUST_LOGOUT"
};

const actions = {
  setJWTToken({ commit }, token) {
    commit(types.SET_JWT_TOKEN, token);
  },

  logout({ dispatch }) {
    return new Promise(resolve => {
      Vue.auth.logout();
      dispatch("resetSession");
      resolve();
    });
  },

  resetSession({ dispatch }) {
    dispatch("user/resetUser", null, { root: true });
    dispatch("setJWTToken", null);
    dispatch("justLogout", null);
    dispatch("init");
  },

  setResolved({ commit }) {
    commit(types.SET_RESOLVED);
  },

  setRejected({ commit }, error) {
    commit(types.SET_REJECTED, error);
  },

  init({ commit }) {
    commit(types.INIT_READY);
  },

  justLogout({ commit }) {
    commit(types.JUST_LOGOUT);
  }
};

const mutations = {
  [types.SET_JWT_TOKEN](state, token) {
    state.jwtToken = token;
  },

  [types.SET_RESOLVED](state) {
    state.sessionResolved();
  },

  [types.SET_REJECTED](state, error) {
    // TODO: For now, we do not reject the session because if we are not logged, vue-auth will reject
    // and then we are blocked. We will have to notify in some cases...
    //state.sessionRejected(error);
  },

  [types.INIT_READY](state) {
    state.ready = new Promise((resolve, reject) => {
      state.sessionResolved = resolve;
      state.sessionRejected = reject;
    });
  },

  [types.JUST_LOGOUT](state) {
    state.justLogout = true;
  }
};

const getters = {
  ready: state => state.ready
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
