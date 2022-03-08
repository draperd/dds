import React, { createContext, useEffect, useReducer, useState } from "react";

import {
  TableState,
  InMemoryTableProps,
  InMemoryPaginatedTableProps,
  AsyncPaginatedTableProps,
  SelectableTableProps,
  ComposedTableProps,
} from "./types";

import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../html/Table";
import { Stack } from "../../primitives/Stack";
import {
  createTableHeader,
  createTableBody,
  getHeadingKeys,
  getInitialSortState,
  getPage,
  sortRows,
  createPaginationControls,
  createSimpleTableHeader,
  createSelectableTableBody,
  createSelectableTableHeader,
} from "./utils";
import { reducer } from "./reducers";
import { createSelectRowAction, createSelectRowsAction } from "./actions";
export const DEFAULT_PAGE_SIZE = 10;

// TODO Probably want to define a type for table context here
export const TableContext = React.createContext({});

// This is the simplest example of a table
// - NO selection
// - NO sorting
// - NO pagination
export const InMemoryTable = (props: InMemoryTableProps<Object>) => {
  const { tableHeaderConfig, tableData, spacingSize = "MEDIUM" } = props;

  const heading = createSimpleTableHeader({
    tableHeaderConfig,
    spacingSize,
  });
  const headingKeys = Object.keys(tableHeaderConfig);
  const body = createTableBody({
    tableHeaderConfig,
    tableData: tableData,
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
    spacingSize = "MEDIUM",
    width,
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
    <div>
      <Stack>
        <Table width={width}>
          {heading}
          {body}
        </Table>
        {paginationControls}
      </Stack>
    </div>
  );
};

export const AsyncPaginatedTable = (
  props: AsyncPaginatedTableProps<Object>
) => {
  const {
    dataUrl,
    resultsAttribute,
    countAttribute,
    tableHeaderConfig,
    pageSize,
    spacingSize = "MEDIUM",
    width,
  } = props;

  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const response = await fetch(`${dataUrl}?page=${pageNumber}`);
      const newData = await response.json();

      if (active) {
        console.log("New data", newData, newData[resultsAttribute]);
        setTableData(newData[resultsAttribute]);
        setCount(newData[countAttribute]);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [pageNumber]);

  const heading = createSimpleTableHeader({
    tableHeaderConfig,
    spacingSize,
  });

  const headingKeys = getHeadingKeys({ tableHeaderConfig });
  const body = createTableBody({
    tableHeaderConfig,
    tableData,
    headingKeys,
    spacingSize,
  });

  const paginationControls = createPaginationControls({
    tableData,
    pageNumber,
    pageSize,
    totalRecords: count,
    setPageNumber,
  });

  return (
    <Stack>
      <Table width={width}>
        {heading}
        {body}
      </Table>
      {paginationControls}
    </Stack>
  );
};

export const SelectableTable = (props: SelectableTableProps<Object>) => {
  const {
    tableHeaderConfig,
    tableData,
    spacingSize = "MEDIUM",
    rowKey,
    actions,
    width,
  } = props;

  const initialState: TableState<Object> = {
    totalRows: tableData.length,
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    tableData,
    selectedRows: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  const heading = createSelectableTableHeader({
    tableHeaderConfig,
    tableData: tableData,
    spacingSize,
    rowKey,
    selectedRows: state.selectedRows,
    selectRows: ({ rowKey, select }) =>
      dispatch(createSelectRowsAction({ rowKey, select })),
  });
  const headingKeys = Object.keys(tableHeaderConfig);
  const body = createSelectableTableBody({
    rowKey,
    tableHeaderConfig,
    tableData: tableData,
    headingKeys,
    spacingSize,
    selectedRows: state.selectedRows,
    selectRow: ({ key, selected }) =>
      dispatch(createSelectRowAction({ key, selected })),
  });

  return (
    <TableContext.Provider value={context}>
      {actions({ rowKey, selectedRows: state.selectedRows, tableData })}
      <Table width={width}>
        {heading}
        {body}
      </Table>
    </TableContext.Provider>
  );
};

// This example just shows how to build a table directly from primitives...
export const ComposedTable = (props: ComposedTableProps) => {
  return (
    <Table width="auto">
      <TableHead>
        <TableRow>
          <TableHeadCell>Letters</TableHeadCell>
          <TableHeadCell>Numbers</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableDataCell>1</TableDataCell>
          <TableDataCell>A</TableDataCell>
        </TableRow>
        <TableRow>
          <TableDataCell>2</TableDataCell>
          <TableDataCell>B</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
