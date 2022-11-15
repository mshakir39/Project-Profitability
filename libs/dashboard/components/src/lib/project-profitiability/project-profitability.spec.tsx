import { render } from "@testing-library/react";

import ProjectProfitability from "./project-profitability";

describe("ProjectProfitability", () => {
  it("should render ProjectProfitability Page successfully", () => {
    const { baseElement } = render(<ProjectProfitability />);
    expect(baseElement).toBeInTheDocument();
  });
});
