import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InMemoryTable } from "../recipes/tables";
import { InMemoryTableProps } from "../recipes/tables/types";

export default {
  title: "Example/Tables",
  component: InMemoryTable,
} as ComponentMeta<typeof InMemoryTable>;

const Template: ComponentStory<typeof InMemoryTable> = (args) => (
  <InMemoryTable {...args} />
);

export type Album = {
  artist: string;
  title: string;
  released: number;
};

const table1: InMemoryTableProps<Album> = {
  tableHeaderConfig: {
    artist: {
      label: "Artist",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    title: {
      label: "Title",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    released: {
      label: "Year released",
      sortable: true,
      spacingAlignment: "LEFT",
    },
  },

  tableData: [
    { artist: "REM", title: "Accelerate", released: 2008 },
    { artist: "REM", title: "Up", released: 1998 },
    { artist: "REM", title: "Monster", released: 1994 },
  ],
};

export const InMemory = Template.bind({});
InMemory.args = {
  ...table1,
};
