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
          console.log("OIDC user is loaded:", user);
          store.dispatch("session/setJWTToken", user.access_token);
          store.dispatch("user/fetchUser");
        },
        userUnloaded: () => console.log("OIDC user is unloaded"),
        accessTokenExpiring: () => console.log("Access token will expire"),
        accessTokenExpired: () => {
          console.log("Access token expired");
          forceAuth();
        },
        silentRenewError: () => console.log("OIDC user is unloaded"),
        userSignedOut: () => {
          console.log("User signed out from remote");
          forceAuth();
        }
      }
    )
  );

  function forceAuth() {
    console.log("Forcing auth...");
    userManager.storeUser();

    router.push("/login");
  }

  return store;
}

function isPublicRoute(route) {
  return route.meta && !route.meta.auth;
}

export default { configure };
