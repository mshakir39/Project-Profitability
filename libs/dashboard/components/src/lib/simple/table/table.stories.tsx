import { ComponentStory, ComponentMeta } from "@storybook/react";
import Table from "./table";
import { IReactTable } from "./table";
export default {
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args: IReactTable) => (
  <Table {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  headers: ["", "Month1", "Month2", "Month3"],
  data: [
    {
      " Allocated Budget": "Allocated Budget",
      month1: "",
      month2: "",
      month3: "",
    },
    {
      "Budget Profitablility Goal": "Budget Profitablility Goal",
      month1: "",
      month2: "",
      month3: "",
    },
    { "Billable Spent": "Billable Spent", month1: "", month2: "", month3: "" },
    {
      "Profitability %": "Profitability %",
      month1: "",
      month2: "",
      month3: "",
    },
  ],
};
