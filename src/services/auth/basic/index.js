import VueAuth from "@websanova/vue-auth";
import jwt from "./jwt";
import store from "./store";

const config = {
  auth: jwt,
  http: require("@websanova/vue-auth/drivers/http/axios.1.x"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  refreshData: {
    enabled: false
  },
  fetchData: {
    url: "api/user",
    method: "GET",
    enabled: true
  }
};

function init(Vue) {
  Vue.use(VueAuth, config);
  store.configure();
}

export { init };
