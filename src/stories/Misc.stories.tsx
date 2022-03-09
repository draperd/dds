import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MiscellaneousComponents } from "./Misc";

export default {
  title: "Example/Miscellaneous",
  component: MiscellaneousComponents,
} as ComponentMeta<typeof MiscellaneousComponents>;

const Template: ComponentStory<typeof MiscellaneousComponents> = (args) => (
  <MiscellaneousComponents />
);

export const Components = Template.bind({});
Components.args = {};
