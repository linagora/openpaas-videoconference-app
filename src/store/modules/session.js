import Vue from "vue";

let userResolve;
let userReject;
const ready = new Promise((resolve, reject) => {
  userResolve = resolve;
  userReject = reject;
});

const state = {
  jwtToken: localStorage.getItem("default_auth_token")
};

const types = {
  SET_JWT_TOKEN: "SET_JWT_TOKEN"
};

const actions = {
  setJWTToken({ commit }, token) {
    commit(types.SET_JWT_TOKEN, token);
  },

  logout({ dispatch }) {
    return new Promise(resolve => {
      Vue.auth.logout();
      dispatch("session/resetSession");
      resolve();
    });
  },

  resetSession({ commit, dispatch }) {
    // TODO, should reset the whole store
    commit(types.FETCH_USER, {});
    dispatch("session/setJWTToken", null);
  }
};

const mutations = {
  [types.SET_JWT_TOKEN](state, token) {
    state.jwtToken = token;
  }
};

const getters = {
  ready: () => ready
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export { userResolve, userReject };
