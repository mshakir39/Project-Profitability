import { ComponentStory, ComponentMeta } from "@storybook/react";
import Accordion from "./accordion";

export default {
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args}>Children here</Accordion>
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Current Profitability",
  dataTestId: "accordion-id",
};
