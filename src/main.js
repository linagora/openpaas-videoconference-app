import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import services from "./services/index";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import VueClipboard from "vue-clipboard2";
import theme from "./theme";
import { i18n } from "@/i18n/index";
import "./main.styl";

Vue.use(VueAxios, axios);
axios.defaults.baseURL = store.state.applicationConfiguration.baseUrl;
Vue.router = router;

Vue.use(require("@websanova/vue-auth"), services.auth);

Vue.use(Vuetify, { theme });

Vue.use(VueClipboard);

Vue.config.productionTip = false;

const Application = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

window.Application = Application;
