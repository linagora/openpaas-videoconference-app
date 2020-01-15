import Auth from "./auth";

const VueAuthPlugin = {
  install(Vue, options) {
    console.log("Installing OIDC Auth Plugin", options);

    const auth = new Auth(options);

    Vue.auth = auth;

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get: function get() {
          return auth;
        }
      }
    });
  }
};

export default VueAuthPlugin;
