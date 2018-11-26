const loginFromForm = (email, password) => {
  cy.visit("/login");

  cy.get(".login-form")
    .find(".login-user-input input")
    .type(email);

  cy.get(".login-form")
    .find(".login-password-input input")
    .type(password);

  cy.get(".login-form").trigger("keydown", { key: "Enter" });
};

describe("Login feature", () => {
  beforeEach(() => {
    cy.server();
    cy.fixture("adminUser.json").then(fixture => cy.route("/api/user", fixture));
  });

  describe("When I am on the login page and I try to login", () => {
    describe("On login failure", () => {
      it("I should see an error notification", () => {
        cy.route({
          method: "POST",
          url: "/api/jwt/generate",
          status: 503,
          response: {}
        }).as("loginSubmit");

        loginFromForm("user", "secret");
        cy.wait("@loginSubmit");
        cy.get(".v-snack").should("be.visible");
        cy.get(".v-snack").should("contain", "Login error, please retry");
      });
    });

    describe("On login success", () => {
      it("I should be redirected to the default conference room", () => {
        cy.route({
          method: "POST",
          url: "/api/jwt/generate",
          status: 200,
          response: {}
        }).as("loginSubmit");

        loginFromForm("user", "secret");
        cy.wait("@loginSubmit");
        cy.nextTick(app => expect(app.$route.params).to.eql({ conferenceid: "OpenPaaS" }));
      });

      it("I hsould have my user menu filled", () => {
        cy.login("user", "secret");
        cy.get(".user-menu").click();

        cy.get(".user-menu-items")
          .find(".title")
          .contains("admin admin");

        cy.get(".user-menu-items")
          .find(".sub-title")
          .contains("admin@open-paas.org");
      });

      it("I should be able to log out", () => {
        cy.login("user", "secret");
        cy.get(".user-menu").click();

        cy.get(".user-menu-items")
          .find(".logout")
          .click();

        cy.location().then(location => expect(location.pathname).to.eql("/login"));
      });
    });
  });
});
