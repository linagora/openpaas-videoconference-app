import Vue from "vue";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import VueClipboard from "vue-clipboard2";
import OpenPaaS from "vue-openpaas-components";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { auth, api } from "@/services";
import theme from "@/theme";
import { i18n } from "@/i18n";
import "@/main.styl";

Vue.use(VueAxios, api);
Vue.router = router;
Vue.use(require("@websanova/vue-auth"), auth);
Vue.use(Vuetify, { theme });
Vue.use(VueClipboard);
Vue.use(OpenPaaS);

Vue.config.productionTip = false;

const Application = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

window.Application = Application;
