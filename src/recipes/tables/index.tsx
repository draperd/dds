import React, { useState } from "react";

import {
  // DynamicTableProps,
  // DynamicTableState,
  InMemoryTableProps,
  CreateTableHeader,
  CreateTableRow,
  CreateTableRows,
  InMemoryPaginatedTableProps,
  CreatePageButtons,
  CreateTableHeaderCell,
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
import { Inline } from "../../primitives/Inline";
import { Text } from "../../primitives/Text";
import { Button } from "../Button";
import {
  getHeadingKeys,
  getInitialSortState,
  getNextSortState,
  getPage,
  pageDown,
  pageUp,
  sortRows,
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

const createTableHeaderCell: CreateTableHeaderCell = ({
  headingKey,
  headerConfig,
  sortState,
  setSortState,
}) => {
  const { label, sortable } = headerConfig;
  const { sortDirection } = sortState;

  if (sortable) {
    const sortButtonLabel = sortDirection === "ASCENDING" ? "A" : "D";
    const nextSortState = getNextSortState({
      sortState,
      nextSortAttribute: headingKey,
    });

    return (
      <TableHeadCell key={headingKey}>
        <Inline>
          <Text content={label}></Text>
          <Button
            label={sortButtonLabel}
            onPress={() => setSortState(nextSortState)}
          ></Button>
        </Inline>
      </TableHeadCell>
    );
  }
  return (
    <TableHeadCell>
      <Text content={label}></Text>
    </TableHeadCell>
  );
};

const createTableHeader: CreateTableHeader<Object> = ({
  tableHeaderConfig,
  sortState,
  setSortState,
}) => {
  const headerCells = [];
  for (const [key, value] of Object.entries(tableHeaderConfig)) {
    headerCells.push(
      createTableHeaderCell({
        headingKey: key,
        headerConfig: value,
        sortState,
        setSortState,
      })
    );
  }
  return headerCells;
};

const createTableRow: CreateTableRow<Object> = ({
  tableRowData,
  headingKeys,
  rowNumber,
}) => {
  return headingKeys.map((headingKey, index) => (
    <TableDataCell key={`${rowNumber}_${index}`}>
      {tableRowData[headingKey]}
    </TableDataCell>
  ));
};

const createTableRows: CreateTableRows<Object> = ({
  tableData,
  headingKeys,
}) => {
  return tableData.map((tableRowData, rowNumber) => (
    <TableRow key={rowNumber}>
      {createTableRow({ tableRowData, headingKeys, rowNumber })}
    </TableRow>
  ));
};

const createPageButtons: CreatePageButtons = ({
  pageSize,
  totalRecords,
  setPageNumber,
}) => {
  const pageCount = Math.ceil(totalRecords / pageSize);
  const pageButtons = [];
  for (let i = 0; i < pageCount; i++) {
    const pageNumber = i + 1;
    const label = pageNumber.toString();
    // TODO: This key needs to be changed obviously! :)
    pageButtons.push(
      <Button
        key={label}
        label={label}
        onPress={() => setPageNumber(pageNumber)}
      ></Button>
    );
  }
  return pageButtons;
};

// This is the simplest example of a table
// - NO selection
// - NO pagination
export const InMemoryTable = (props: InMemoryTableProps<Object>) => {
  const { tableHeaderConfig, tableData, sortAttribute, sortDirection } = props;

  const initialSortState = getInitialSortState({
    sortAttribute,
    sortDirection,
  });

  const [sortState, setSortState] = useState(initialSortState);

  const heading = createTableHeader({
    tableHeaderConfig,
    sortState,
    setSortState,
  });
  const headingKeys = Object.keys(tableHeaderConfig);

  const sortedTableData = sortRows({ sortState, tableData });
  const rows = createTableRows({ tableData: sortedTableData, headingKeys });

  return (
    <Table>
      <TableHead>
        <TableRow>{heading}</TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
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
  });
  const headingKeys = getHeadingKeys({ tableHeaderConfig });
  const sortedTableData = sortRows({ sortState, tableData });
  const [pageNumber, setPageNumber] = useState(1);

  const totalRecords = tableData.length;
  const tablePage = getPage({
    tableData: sortedTableData,
    pageNumber,
    pageSize,
  });
  const rows = createTableRows({ tableData: tablePage, headingKeys });
  const pageButtons = createPageButtons({
    pageSize,
    totalRecords,
    setPageNumber,
  });

  return (
    <Stack>
      <Table>
        <TableHead>
          <TableRow>{heading}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
      <Inline>
        <Button
          label="<"
          onPress={() => pageDown({ pageNumber, setPageNumber })}
        ></Button>
        {pageButtons}
        <Button
          label=">"
          onPress={() =>
            pageUp({ pageNumber, pageSize, totalRecords, setPageNumber })
          }
        ></Button>
      </Inline>
    </Stack>
  );
};
