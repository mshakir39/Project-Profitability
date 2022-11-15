import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProjectProfitability } from "./project-profitability";

export default {
  component: ProjectProfitability,
} as ComponentMeta<typeof ProjectProfitability>;

const Template: ComponentStory<typeof ProjectProfitability> = (args) => (
  <ProjectProfitability {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
