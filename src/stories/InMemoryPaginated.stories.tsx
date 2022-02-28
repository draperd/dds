import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InMemoryPaginatedTable } from "../recipes/tables";
import { InMemoryPaginatedTableProps } from "../recipes/tables/types";

export default {
  title: "Example/Tables/InMemoryPaginated",
  component: InMemoryPaginatedTable,
} as ComponentMeta<typeof InMemoryPaginatedTable>;

const Template: ComponentStory<typeof InMemoryPaginatedTable> = (args) => (
  <InMemoryPaginatedTable {...args} />
);

const table1: InMemoryPaginatedTableProps = {
  tableHeaderConfig: [
    { id: "1", content: "One" },
    { id: "2", content: "Two" },
    { id: "3", content: "Three" },
  ],
  tableData: [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"],
    ["J", "K", "L"],
    ["M", "N", "O"],
    ["P", "Q", "R"],
    ["S", "T", "U"],
  ],
  pageSize: 2,
};

export const InMemory = Template.bind({});
InMemory.args = {
  ...table1,
};
