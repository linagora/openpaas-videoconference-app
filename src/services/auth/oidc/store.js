import { vuexOidcCreateStoreModule, vuexOidcCreateUserManager } from "vuex-oidc";
import { VUEX_NAMESPACE } from "./constants";
import store from "@/store";
import router from "@/router";
import config from "./config";

function configure() {
  const userManager = vuexOidcCreateUserManager(config);

  store.registerModule(
    VUEX_NAMESPACE,
    vuexOidcCreateStoreModule(
      config,
      {
        namespaced: true,
        dispatchEventsOnWindow: true,
        isPublicRoute,
        defaultSigninRedirectOptions: {
          useReplaceToNavigate: true
        }
      },
      {
        userLoaded: user => {
          console.log("OIDC - User is loaded", user);
          store.dispatch("session/setJWTToken", user.access_token);
          store.dispatch("user/fetchUser");
        },
        userUnloaded: () => console.log("OIDC - User is unloaded"),
        accessTokenExpiring: () => console.log("OIDC - Access token will expire"),
        accessTokenExpired: () => {
          console.log("OIDC - Access token expired");
          forceAuth(true);
        },
        silentRenewError: () => console.log("OIDC - Silent renew error"),
        userSignedOut: () => {
          console.log("OIDC - User signed out from remote");
          forceAuth(false);
        }
      }
    )
  );

  function forceAuth(store) {
    console.log("OIDC - Forcing auth...", store);
    store && userManager.storeUser();

    router.push("/login");
  }

  return store;
}

function isPublicRoute(route) {
  return route.meta && !route.meta.auth;
}

export default { configure };
