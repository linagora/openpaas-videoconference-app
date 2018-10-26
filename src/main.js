import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import theme from "./theme";
import "./main.styl";

Vue.use(VueAxios, axios);
axios.defaults.baseURL = store.state.baseUrl;

Vue.use(Vuetify, { theme });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
