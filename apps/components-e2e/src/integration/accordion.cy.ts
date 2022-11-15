describe("components", () => {
  it("should display Accordion with onClick", () => {
    cy.visit(`${Cypress.env("STORYBOOK_PATH")}&id=simple-accordion--primary`);
    cy.get('[data-testid="accordion-id"')
      .contains("Current Profitability")
      .click()
      .get('[data-testid="accordion-children"]')
      .contains("Children here");
  });
});
