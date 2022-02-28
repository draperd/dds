import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InMemoryPaginatedTable } from "../recipes/tables";
import { InMemoryPaginatedTableProps } from "../recipes/tables/types";
import { Album } from "./Table.stories";

export default {
  title: "Example/Tables/InMemoryPaginated",
  component: InMemoryPaginatedTable,
} as ComponentMeta<typeof InMemoryPaginatedTable>;

const Template: ComponentStory<typeof InMemoryPaginatedTable> = (args) => (
  <InMemoryPaginatedTable {...args} />
);

const table1: InMemoryPaginatedTableProps<Album> = {
  tableHeaderConfig: {
    artist: {
      index: false,
      label: "Artist",
      sortable: true,
    },
    title: {
      index: false,
      label: "Title",
      sortable: true,
    },
    released: {
      index: false,
      label: "Year released",
      sortable: true,
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
    { artist: "U2", title: "Actung Baby", released: 1991 },
    { artist: "U2", title: "The Joshua Tree", released: 1987 },
  ],

  pageSize: 4,
};

export const InMemory = Template.bind({});
InMemory.args = {
  ...table1,
};
