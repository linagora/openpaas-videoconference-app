import OidcPlugin from "./plugin";
import router from "./router";
import store from "./store";
import config from "./config";

function init(Vue) {
  router.configure();
  Vue.use(OidcPlugin, {
    config,
    store: store.configure()
  });
}

export { init };
