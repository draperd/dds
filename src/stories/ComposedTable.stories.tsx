import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ComposedTable } from "../recipes/tables";
import { ComposedTableProps } from "../recipes/tables/types";

export default {
  title: "Example/Tables",
  component: ComposedTable,
} as ComponentMeta<typeof ComposedTable>;

const Template: ComponentStory<typeof ComposedTable> = (args) => (
  <ComposedTable {...args} />
);

const table1: ComposedTableProps = {
  spacingSize: "SMALL",
};

export const Composed = Template.bind({});
Composed.args = {
  ...table1,
};
