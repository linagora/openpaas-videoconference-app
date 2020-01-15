import { vuexOidcCreateRouterMiddleware } from "vuex-oidc";
import { VUEX_NAMESPACE } from "./constants";
import OidcCallback from "@/views/login/oidc/OidcCallback.vue";
import OidcCallbackError from "@/views/login/oidc/OidcCallbackError.vue";
import router from "@/router";
import store from "@/store";

export const routeNames = Object.freeze({
  CALLBACK: "oidcCallback",
  CALLBACK_ERROR: "oidcCallbackError"
});

function configure() {
  router.addRoutes([
    {
      path: "/oidc/callback",
      name: routeNames.CALLBACK,
      component: OidcCallback,
      meta: {
        isOidcCallback: true,
        auth: false
      }
    },
    {
      path: "/oidc/error",
      name: routeNames.CALLBACK_ERROR,
      component: OidcCallbackError,
      meta: {
        auth: false
      }
    }
  ]);

  router.beforeEach(vuexOidcCreateRouterMiddleware(store, VUEX_NAMESPACE));
}

export default { configure };
