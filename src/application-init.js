import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import VueClipboard from "vue-clipboard2";
import i18n from "@/i18n";
import OpenPaaS from "vue-openpaas-components";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { Api, auth as servicesAuth } from "@/services";

const defaultTheme = {
  primary: colors.blue
};

// This prevents polluting the global Axios and Vue instances
// See for instance : https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-446988490
async function applicationInit(VueInstance, { auth = servicesAuth, theme = defaultTheme } = {}) {
  const api = new Api({
    baseURL: store.state.applicationConfiguration.baseUrl
  });

  VueInstance.use(OpenPaaS, { api });
  VueInstance.use(VueAxios, api.client);

  VueInstance.router = router;
  VueInstance.use(Vuetify, { theme });
  VueInstance.use(VueClipboard);

  await auth.init(VueInstance);

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
