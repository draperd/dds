import React, { createContext, useEffect, useReducer, useState } from "react";

import {
  TableState,
  InMemoryTableProps,
  InMemoryPaginatedTableProps,
  AsyncPaginatedTableProps,
  SelectableTableProps,
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
  createSimpleTableHeader,
  createSelectableTableBody,
  createSelectableTableHeader,
} from "./utils";
import { reducer } from "./reducers";
import { createSelectRowAction } from "./actions";

export const DEFAULT_PAGE_SIZE = 10;

// TODO Probably want to define a type for table context here
export const TableContext = React.createContext({});

// // Hate the name DynamicTable, but it'll do for now... grrr
// export const DynamicTable = (props: DynamicTableProps) => {
//   const {} = props;

//   const initialState: TableState<Object> = {
//     totalRows: 0,
//     pageSize: DEFAULT_PAGE_SIZE,
//     currentPage: 1,
//     tableData: {},
//   };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const context = createContext({ state, dispatch });

//   // Things to consider...
//   // 1. Is data provided?
//   // 2. Are functions provided?
//   // 3. Can both be provided?

//   return (
//     <TableContext.Provider value={context}>
//       <Table></Table>
//     </TableContext.Provider>
//   );
// };

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
  } = props;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://swapi.dev/api/people/`);
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, []);

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
      {data && <span>Got data</span>}
      <Stack>
        <Table>
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
      <Table>
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
  } = props;

  const initialState: TableState<Object> = {
    totalRows: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    currentPage: 1,
    tableData,
    selectedRows: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  // TODO - Need to manage state of selected rows
  // TODO - Consider useReducer this time?
  // TODO - Need to be able to indicate selected state on each row - Box property?
  // TODO - Pass setState or reducer actions to header and body helpers

  const heading = createSelectableTableHeader({
    tableHeaderConfig,
    spacingSize,
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
      <Table>
        {heading}
        {body}
      </Table>
    </TableContext.Provider>
  );
};
