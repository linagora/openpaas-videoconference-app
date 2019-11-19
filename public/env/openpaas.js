window.openpaas = {
  // This as to be injected at runtime
  // For example, when running with docker, mount a volume here and push right values in this file
  // OPENPAAS_URL: "https://dev.open-paas.org"

  // Define the authentication method to use: "oidc" or "basic" (defaults to "basic" when not defined)
  // VUE_APP_AUTH: "oidc",

  // Decide whether requests to Jitsi server use HTTP or HTTPs protocol, if true jitsi requests will be sent under HTTP
  // VUE_APP_JITSI_NO_SSL: true,

  // OpenID Connect configuration
  oidc: {
    // `authority` is the OpenID Connect Authority: lemon, keycloak, etc...
    authority: "http://localhost:8888/auth/realms/master",
    // `clientId` is defined on the authority and needs to match the local one.
    // A good practice is to have a generated string
    clientId: "openpaas",
    // `redirectUri` is the application URL the user agent is redirected after login on the authority server
    // "/oidc/callback" is the local Vue application route handling the redirect
    // This redirect URI must be declared as valid redirect URI on the authority server client definition
    redirectUri: "http://localhost:8081/oidc/callback",
    // `postLogoutUri` is the application URL the user agent is redirected after logout on the authority server
    // "/login" is the local Vue application route handling the redirect
    // This redirect URI must be declared as valid redirect URI on the authority server client definition
    postLogoutRedirectUri: "http://localhost:8081/login",
    // `responseType` is what is response types expected by the client
    responseType: "id_token token",
    // `scope` are used by the application during authentication to authorize access to a user's details
    scope: "openid email profile"
  }
};
