import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SelectableTable } from "../recipes/tables";
import { SelectableTableProps } from "../recipes/tables/types";
import { Album } from "./Table.stories";

export default {
  title: "Example/Tables",
  component: SelectableTable,
} as ComponentMeta<typeof SelectableTable>;

const Template: ComponentStory<typeof SelectableTable> = (args) => (
  <SelectableTable {...args} />
);

const table1: SelectableTableProps<Album> = {
  rowKey: "title",
  tableHeaderConfig: {
    artist: {
      index: false,
      label: "Artist",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    title: {
      index: false,
      label: "Title",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    released: {
      index: false,
      label: "Year released",
      sortable: true,
      spacingAlignment: "RIGHT",
    },
  },
  tableData: [
    { artist: "REM", title: "Accelerate", released: 2008 },
    { artist: "REM", title: "Up", released: 1998 },
    { artist: "REM", title: "Monster", released: 1994 },
    { artist: "REM", title: "Reveal", released: 2001 },
    { artist: "REM", title: "Automatic for the People", released: 1992 },
    { artist: "REM", title: "Out of Time", released: 1991 },
    { artist: "U2", title: "Zooropa", released: 1993 },
    { artist: "U2", title: "Pop", released: 1997 },
    { artist: "U2", title: "All that you can't leave behind", released: 2000 },
    // { artist: "U2", title: "Actung Baby", released: 1991 },
    // { artist: "U2", title: "The Joshua Tree", released: 1987 },
  ],
  // sortAttribute: "title",
  // sortDirection: "ASCENDING",
  // pageSize: 5,
  spacingSize: "SMALL",
};

export const Selectable = Template.bind({});
Selectable.args = {
  ...table1,
};