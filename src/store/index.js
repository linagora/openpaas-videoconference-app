import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import plugins from "./plugins";
import user from "./modules/user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  actions,
  getters,
  mutations,
  plugins,
  state: state(),
  strict: process.env.NODE_ENV !== "production"
});
