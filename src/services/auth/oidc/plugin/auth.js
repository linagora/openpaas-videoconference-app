export default class Auth {
  constructor(options) {
    this.options = options;
  }

  ready(callback) {
    if (callback) {
      this.options.store.dispatch("oidcStore/addOidcEventListener", {
        eventName: "userLoaded",
        eventListener: user => {
          this.options.store.dispatch("session/setJWTToken", user.access_token);
          callback();
        }
      });
    }
    return true;
  }

  check() {
    return (
      this.options.store.getters["oidcStore/oidcAuthenticationIsChecked"] &&
      this.options.store.getters["oidcStore/oidcIsAuthenticated"]
    );
  }

  logout() {
    // order matters. Clean data before signin out (which redirects to OIDC logout)
    this.options.store.dispatch("session/resetSession");
    this.options.store.dispatch("oidcStore/removeOidcUser");
    this.options.store.dispatch("oidcStore/signOutOidc");
  }
}
