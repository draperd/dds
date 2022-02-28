import React, { useState } from "react";

import {
  // DynamicTableProps,
  // DynamicTableState,
  InMemoryTableProps,
  InMemoryPaginatedTableProps,
} from "./types";

import { Table } from "../../html/Table";
import { Stack } from "../../primitives/Stack";
import {
  createTableHeader,
  createTableBody,
  getHeadingKeys,
  getInitialSortState,
  getPage,
  sortRows,
  createPaginationControls,
} from "./utils";

// TODO Probably want to define a type for table context here
export const TableContext = React.createContext({});

// Hate the name DynamicTable, but it'll do for now... grrr
// export const DynamicTable = (props: DynamicTableProps) => {
//   const {} = props;

//   const initialState: DynamicTableState = {};
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const context = createContext({ state, dispatch });

//   // Things to consider...
//   // 1. Is data provided?
//   // 2. Are functions provided?
//   // 3. Can both be provided?

//   return <TableContext.Provider value={context}></TableContext.Provider>;
// };

// This is the simplest example of a table
// - NO selection
// - NO pagination
export const InMemoryTable = (props: InMemoryTableProps<Object>) => {
  const {
    tableHeaderConfig,
    tableData,
    sortAttribute,
    sortDirection,
    spacingSize,
  } = props;

  const initialSortState = getInitialSortState({
    sortAttribute,
    sortDirection,
  });

  const [sortState, setSortState] = useState(initialSortState);

  const heading = createTableHeader({
    tableHeaderConfig,
    sortState,
    setSortState,
    spacingSize,
  });
  const headingKeys = Object.keys(tableHeaderConfig);

  const sortedTableData = sortRows({ sortState, tableData });
  const body = createTableBody({
    tableHeaderConfig,
    tableData: sortedTableData,
    headingKeys,
    spacingSize,
  });

  return (
    <Table>
      {heading}
      {body}
    </Table>
  );
};

export const InMemoryPaginatedTable = (
  props: InMemoryPaginatedTableProps<Object>
) => {
  const {
    tableHeaderConfig,
    tableData,
    pageSize,
    sortAttribute,
    sortDirection,
    spacingSize,
  } = props;

  const initialSortState = getInitialSortState({
    sortAttribute,
    sortDirection,
  });

  const [sortState, setSortState] = useState(initialSortState);
  const [pageNumber, setPageNumber] = useState(1);

  const sortedTableData = sortRows({ sortState, tableData });
  const tablePage = getPage({
    tableData: sortedTableData,
    pageNumber,
    pageSize,
  });

  const heading = createTableHeader({
    tableHeaderConfig,
    sortState,
    setSortState,
    spacingSize,
  });

  const headingKeys = getHeadingKeys({ tableHeaderConfig });
  const body = createTableBody({
    tableHeaderConfig,
    tableData: tablePage,
    headingKeys,
    spacingSize,
  });

  const paginationControls = createPaginationControls({
    tableData,
    pageNumber,
    pageSize,
    setPageNumber,
  });

  return (
    <Stack>
      <Table>
        {heading}
        {body}
      </Table>
      {paginationControls}
    </Stack>
  );
};
