import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueAuth from "@websanova/vue-auth";
import VueClipboard from "vue-clipboard2";
import i18n from "@/i18n";
import OpenPaaS from "vue-openpaas-components";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { api, auth as servicesAuth } from "@/services";

const defaultTheme = {
  primary: colors.blue
};

// This prevents polluting the global Axios and Vue instances
// See for instance : https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-446988490
function applicationInit(VueInstance, { axiosInstance = api, auth = servicesAuth, theme = defaultTheme } = {}) {
  VueInstance.use(OpenPaaS);
  VueInstance.use(VueAxios, axiosInstance);

  VueInstance.router = router;
  VueInstance.use(VueAuth, auth);
  VueInstance.use(Vuetify, { theme });
  VueInstance.use(VueClipboard);

  VueInstance.config.productionTip = false;

  return VueInstance;
}

function getApplication(VueInstance) {
  return new VueInstance({
    router,
    store,
    i18n: i18n(VueInstance),
    render: h => h(App)
  }).$mount("#app");
}

export { applicationInit, getApplication, defaultTheme };
