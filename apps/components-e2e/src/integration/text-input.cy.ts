describe("components", () => {
  it("should type input and match it", () => {
    cy.visit(`${Cypress.env("STORYBOOK_PATH")}&id=simple-text-input--primary`);
    cy.get('[data-testid="input-test-id"]')
      // calls the jQuery method "val()"
      .invoke("val")
      // the value is an empty string at first
      .should("equal", "");
    // enter the first name and confirm
    // cy.get('[data-testid="input-test-id"]').type("Muzamil");
    // cy.get('[data-testid="input-test-id"]')
    //   .invoke("val")
    //   .should("equal", "Muzamil");
  });
});
