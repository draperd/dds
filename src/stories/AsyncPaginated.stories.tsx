import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AsyncPaginatedTable } from "../recipes/tables";
import { AsyncPaginatedTableProps } from "../recipes/tables/types";

export default {
  title: "Example/Tables",
  component: AsyncPaginatedTable,
} as ComponentMeta<typeof AsyncPaginatedTable>;

const Template: ComponentStory<typeof AsyncPaginatedTable> = (args) => (
  <AsyncPaginatedTable {...args} />
);

export type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string;
  url: string;
};

export type SwapiPersonData = {
  count: number;
  next: string;
  previous?: string;
  results: Person[];
};

const table1: AsyncPaginatedTableProps<Person> = {
  tableHeaderConfig: {
    name: {
      index: false,
      label: "Name",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    gender: {
      index: false,
      label: "Gender",
      sortable: true,
      spacingAlignment: "LEFT",
    },
    mass: {
      index: false,
      label: "Mass",
      sortable: true,
      spacingAlignment: "RIGHT",
    },
  },
  sortAttribute: "name",
  sortDirection: "ASCENDING",
  pageSize: 10,
  spacingSize: "SMALL",
  dataUrl: "https://swapi.dev/api/people/",
  countAttribute: "count",
  resultsAttribute: "results",
};

export const AsyncPaginated = Template.bind({});
AsyncPaginated.args = {
  ...table1,
};
