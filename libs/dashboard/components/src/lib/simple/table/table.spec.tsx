import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./table";

describe("Table", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Table
        headers={["Fruit", "Price"]}
        data={[
          { fruit: "apple", price: "300" },
          { fruit: "mango", price: "200" },
        ]}
      />
    );
    expect(baseElement).toBeInTheDocument();
  });
});
