import { render } from "@testing-library/react";

import Accordion from "./accordion";

describe("Accordion", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Accordion label="Test Instance" dataTestId="test-instance" />
    );
    expect(baseElement).toBeTruthy();
  });
});
