// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("application", () => cy.window().its("Application"));
Cypress.Commands.add("nextTick", callback => cy.application().then(app => app.$nextTick(() => callback(app))));
Cypress.Commands.add("login", (user, password, jwtFixture = "adminUserJwt.json") => {
  cy.visit("/");
  cy.server();
  cy.fixture(jwtFixture).then(fixture => {
    cy.route({
      method: "POST",
      url: "/api/jwt/generate",
      status: 200,
      response: fixture
    });

    cy.application().then(app => {
      app.$auth.login({
        url: "api/jwt/generate",
        auth: {
          username: user,
          password: password
        },
        rememberMe: false,
        redirect: { name: "Home" }
      });
    });
  });
});
