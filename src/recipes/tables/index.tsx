import React, { useState } from "react";

import {
  // DynamicTableProps,
  // DynamicTableState,
  InMemoryTableProps,
  CreateTableHeader,
  CreateTableRow,
  CreateTableRows,
  InMemoryPaginatedTableProps,
  GetPage,
  PageDown,
  PageUp,
  CreatePageButtons,
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
import { Button } from "../Button";

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

const createTableHeader: CreateTableHeader<Object> = ({
  tableHeaderConfig,
}) => {
  const headerCells = [];
  for (const [key, value] of Object.entries(tableHeaderConfig)) {
    headerCells.push(<TableHeadCell key={key}>{value.label}</TableHeadCell>);
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

  // return tableRowData.map((tableCell, cellNumber) => (
  //   <TableDataCell key={`${rowNumber}_${cellNumber}`}>
  //     {tableCell}
  //   </TableDataCell>
  // ));
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
// - NO sorting
// - NO pagination
export const InMemoryTable = (props: InMemoryTableProps<Object>) => {
  const { tableHeaderConfig, tableData } = props;
  const heading = createTableHeader({ tableHeaderConfig });
  const headingKeys = Object.keys(tableHeaderConfig);
  const rows = createTableRows({ tableData, headingKeys });

  return (
    <Table>
      <TableHead>
        <TableRow>{heading}</TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

// TODO: We'd want a test for this obviously :)
const getPage: GetPage<Object> = ({ tableData, pageNumber, pageSize }) => {
  // Imagine a page size of 3, 9 rows of data and a page number of 2...
  // Page 2 should be rows 3, 4 & 5 (zero-indexed)
  // debugger;
  const firstRow = (pageNumber - 1) * pageSize; // (2 - 1) * 3 = 3
  const lastRow = firstRow + pageSize; // 3 + 3 = 6
  return tableData.slice(firstRow, lastRow); // Page is 3 -> 6
};

export const pageDown: PageDown = ({ pageNumber, setPageNumber }) => {
  // Important to avoid setting a page number below 1 !!!
  if (pageNumber === 1) {
    return;
  }
  setPageNumber(pageNumber - 1);
};

export const pageUp: PageUp = ({
  pageNumber,
  pageSize,
  totalRecords,
  setPageNumber,
}) => {
  // Important not to set a page beyond the maxium...
  const lastRecordOnPage = (pageNumber - 1) * pageSize + pageSize;
  if (lastRecordOnPage >= totalRecords) {
    // The last record on the page is the last record in the data, no action
    return;
  }
  setPageNumber(pageNumber + 1);
};

export const InMemoryPaginatedTable = (
  props: InMemoryPaginatedTableProps<Object>
) => {
  const { tableHeaderConfig, tableData, pageSize } = props;

  const [pageNumber, setPageNumber] = useState(1);

  const totalRecords = tableData.length;
  const rows = getPage({ tableData, pageNumber, pageSize });
  const pageButtons = createPageButtons({
    pageSize,
    totalRecords,
    setPageNumber,
  });

  return (
    <Stack>
      <InMemoryTable
        tableHeaderConfig={tableHeaderConfig}
        tableData={rows}
      ></InMemoryTable>
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
