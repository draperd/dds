import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DatePicker } from "../recipes/DatePicker";

export default {
  title: "Example/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Simple = Template.bind({});
Simple.args = {
  value: new Date(),
};
