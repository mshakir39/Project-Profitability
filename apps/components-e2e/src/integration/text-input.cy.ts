describe("components", () => {
  it("should type input and match it", () => {
    cy.visit(`${Cypress.env("STORYBOOK_PATH")}&id=simple-text-input--primary`);
    cy.get('[data-cy="text-input"]')
      .find("input")
      .invoke("val")
      .should("equal", "");

    const text = "hello there, friend!";
    cy.get('[data-cy="text-input"]')
      .find("input")
      .type(text)
      .should("have.value", text);
  });
});
