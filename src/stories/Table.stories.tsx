import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InMemoryTable } from "../recipes/tables";
import { InMemoryTableProps } from "../recipes/tables/types";

export default {
  title: "Example/In Memory Table",
  component: InMemoryTable,
} as ComponentMeta<typeof InMemoryTable>;

const Template: ComponentStory<typeof InMemoryTable> = (args) => (
  <InMemoryTable {...args} />
);

const table1: InMemoryTableProps = {
  tableHeaderConfig: [
    { id: "1", content: "One" },
    { id: "2", content: "Two" },
    { id: "3", content: "Three" },
  ],
  tableData: [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
  ],
};

export const Simple = Template.bind({});
Simple.args = {
  ...table1,
};
