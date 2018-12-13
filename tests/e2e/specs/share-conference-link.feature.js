describe("The conference sharing feature", () => {
  describe("When I am not on a private conference page", () => {
    it("I should not a a 'share video conference link'", () => {
      cy.login({ redirectPath: "/o/5123524a-5bff-454d-8a6c-8356faedc723" });
      cy.get(".conference-options-menu").click();
      cy.get(".share-action").should("not.be.visible");
    });
  });

  describe("When I am on a private conference page", () => {
    it("I should not a a 'share video conference link'", () => {
      cy.login({ redirectPath: "/OpenPaaS" });
      cy.get(".conference-options-menu").click();
      cy.get(".share-action").should("be.visible");
    });
  });

  describe("When I want to share the conference", () => {
    it("I should see the conference sharing modal", () => {
      cy.login({ redirectPath: "/OpenPaaS" });
      cy.get(".conference-options-menu").click();
      cy.get(".share-action").click();
      cy.get(".share-conference-modal").should("be.visible");
    });

    context("And it was not able to create a conference", () => {
      it("I should see an error message", () => {
        cy.login({ redirectPath: "/OpenPaaS" });
        cy.get(".conference-options-menu").click();
        cy.get(".share-action").click();
        cy.$t("We have not been able to generate your public conference").then(translatedText => {
          cy.get(".share-conference-modal")
            .find(".conference-error-message")
            .should("contain", translatedText);
        });
      });
    });

    context("And it was able to create the conference", () => {
      beforeEach(() => {
        cy.server();
        cy.fixture("publicConferenceCreationResponse.json").then(fixture => {
          cy.route({
            method: "PUT",
            url: "/videoconference/api/conference/",
            status: 200,
            response: fixture
          });
        });
      });

      it("I should see the conference URL", () => {
        cy.login({ redirectPath: "/OpenPaaS" });
        cy.get(".conference-options-menu").click();
        cy.get(".share-action").click();
        cy.window().then(window => {
          cy.get(".share-conference-modal")
            .find(".url-link-btn")
            .contains(`http://${window.location.host}/o/5058ab7e-c43e-4e19-b395-e994461b8e02`);

          cy.$t("Copy link").then(translatedText => {
            cy.get(".share-conference-modal")
              .find(".copy-link-btn")
              .contains(translatedText);
          });
        });
      });
    });
  });
});
