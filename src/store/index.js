import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import plugins from "./plugins";
import session from "./modules/session";
import ui from "./modules/ui";
import user from "./modules/user";
import applicationConfiguration from "./modules/application-configuration";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    applicationConfiguration,
    session,
    ui,
    user
  },
  actions,
  getters,
  mutations,
  plugins,
  state,
  strict: process.env.NODE_ENV !== "production"
});
