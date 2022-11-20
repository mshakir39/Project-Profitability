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
    const itemsAfter = ["$68.00", "$94.35", "$85.00"];
    const itemsBefore = ["$0.00", "$0.00", "$0.00"];

    cy.get('[data-cy="text-input"]').find("input").should("be.disabled");

    testCellText(itemsBefore);

    cy.get('[data-cy="text-input"]')
      .find("input")
      .eq(3)
      .dblclick({ force: true })
      .should("not.be.disabled")
      .type("15", { force: true });

    testCellText(itemsAfter);

    cy.get('[data-cy="text-input"]').find("input").eq(3).clear();

    testCellText(itemsBefore);
  });
});

function testCellText(items: Array<string>) {
  cy.get("table tbody tr")
    .filter((k, tr) => (<HTMLElement>tr.children[1]).innerText === items[0])
    .should("contain", items[0])
    .and("contain", items[1])
    .and("contain", items[2]);
}
