describe("components", () => {
  it("should visit the page successfully", () => {
    cy.visit(
      `${Cypress.env(
        "STORYBOOK_PATH"
      )}&id=project-profitiability-project-profitability--primary`
    );
  });
  it("should diplay the Elements on Page ", () => {
    cy.get('[data-testid="accordion-testId"]').should("exist");
    cy.get('[data-testid="input-wrapper"]')
      .should("exist")
      .find("input")
      .should("have.length", 4);
    cy.get("table").should("exist");
  });

  it("should enable Text Field on Double Click", () => {
    cy.get('[data-cy="text-input"]').find("input").should("be.disabled");
    cy.get('[data-cy="text-input"]')
      .find("input")
      .eq(3)
      .dblclick({ force: true })
      .should("not.be.disabled");
  });

  it("should Calculate Budget Profitability Goal on Change of Profit Margin Goal ", () => {
    cy.get('[data-cy="text-input"]').find("input").should("be.disabled");
    cy.get('[data-cy="text-input"]')
      .find("input")
      .eq(3)
      .dblclick({ force: true })
      .should("not.be.disabled")
      .type("15", { force: true });

    const items = ["$68.00", "$94.35", "$85.00"];
    items.forEach((item) => {
      cy.get("table").contains("td", item);
    });

    cy.get('[data-cy="text-input"]').find("input").eq(3).clear();
    items.forEach((item) => {
      cy.get("table").contains("td", item).should("not.exist");
    });
  });
});
