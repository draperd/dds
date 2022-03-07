import React from "react";
import {
  CreatePageButtons,
  CreatePaginationControls,
  CreateSelectableTableBody,
  CreateSelectableTableHeader,
  CreateSelectableTableRow,
  CreateSimpleTableHeader,
  CreateTableBody,
  CreateTableHeader,
  CreateTableHeaderCell,
  CreateTableRow,
  GetHeadingKeys,
  GetInitialSortState,
  GetNextSortState,
  GetPage,
  GetSelectedRowsState,
  PageDown,
  PageUp,
  SortRows,
} from "./types";

import { TableBody, TableHead, TableRow } from "../../html/Table";

import { Inline } from "../../primitives/Inline";
import { Button } from "../Button";
import {
  SelectableTableHeaderCell,
  SimpleTableHeaderCell,
  SortableTableHeaderCell,
} from "./header";
import { SelectRowTableDataCell, SimpleTableDataCell } from "./body";

/* *****************************************************
 *
 * TABLE HEADERS
 *
 * *****************************************************/

/**
 * Returns the keys for the heading of each column. These will be an attribute
 * in each record displayed in the table.
 */
export const getHeadingKeys: GetHeadingKeys<Object> = ({ tableHeaderConfig }) =>
  Object.keys(tableHeaderConfig);

/**
 * Creates React components to render a table header cell. These may contain
 * sorting controls if the associated column is configured to be sorted.
 */
export const createTableHeaderCell: CreateTableHeaderCell = ({
  headingKey,
  headerConfig,
  sortState,
  setSortState,
  spacingSize,
}) => {
  const { sortable } = headerConfig;

  if (sortable) {
    return (
      <SortableTableHeaderCell
        headingKey={headingKey}
        tableHeaderCellConfig={headerConfig}
        spacingSize={spacingSize}
        setSortState={setSortState}
        sortState={sortState}
      ></SortableTableHeaderCell>
    );
  }
  return (
    <SimpleTableHeaderCell
      headingKey={headingKey}
      tableHeaderCellConfig={headerConfig}
      spacingSize={spacingSize}
    ></SimpleTableHeaderCell>
  );
};

export const createSimpleTableHeader: CreateSimpleTableHeader<Object> = ({
  tableHeaderConfig,
}) => {
  const headerCells = [];
  for (const [key, value] of Object.entries(tableHeaderConfig)) {
    headerCells.push(
      <SimpleTableHeaderCell
        headingKey={key}
        tableHeaderCellConfig={value}
      ></SimpleTableHeaderCell>
    );
  }
  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
};

export const getSelectedRowsState: GetSelectedRowsState<Object> = ({
  tableData,
  selectedRows,
}) => {
  const rowCount = tableData.length;
  const selectedRowCount = selectedRows.length;
  if (rowCount === selectedRowCount) {
    return "ALL";
  } else if (selectedRowCount === 0) {
    return "NONE";
  }
  return "SOME";
};

export const createSelectableTableHeader: CreateSelectableTableHeader<
  Object
> = ({ tableHeaderConfig, rowKey, selectRows, selectedRows, tableData }) => {
  const headerCells = [];

  const selected = getSelectedRowsState({ tableData, selectedRows });
  const selectableTableHeaderCell = (
    <SelectableTableHeaderCell
      rowKey={rowKey}
      selectRows={selectRows}
      selected={selected}
    ></SelectableTableHeaderCell>
  );
  headerCells.push(selectableTableHeaderCell);
  for (const [key, value] of Object.entries(tableHeaderConfig)) {
    headerCells.push(
      <SimpleTableHeaderCell
        headingKey={key}
        tableHeaderCellConfig={value}
      ></SimpleTableHeaderCell>
    );
  }
  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
};

/**
 * Creates an array of table heading cells.
 */
export const createTableHeader: CreateTableHeader<Object> = ({
  tableHeaderConfig,
  sortState,
  setSortState,
  spacingSize,
}) => {
  const headerCells = [];
  for (const [key, value] of Object.entries(tableHeaderConfig)) {
    headerCells.push(
      createTableHeaderCell({
        headingKey: key,
        headerConfig: value,
        sortState,
        setSortState,
        spacingSize,
      })
    );
  }
  return (
    <TableHead>
      <TableRow>{headerCells}</TableRow>
    </TableHead>
  );
};

/* *****************************************************
 *
 * TABLE ROWS
 *
 * *****************************************************/

/**
 * Creates the React components representing a single row in the table
 */
export const createTableRow: CreateTableRow<Object> = ({
  tableHeaderConfig,
  tableRowData,
  headingKeys,
  rowNumber,
  spacingSize,
}) => {
  return headingKeys.map((headingKey, index) => {
    const tableHeaderCellConfig = tableHeaderConfig[headingKey];
    const { spacingAlignment } = tableHeaderCellConfig;
    return (
      <SimpleTableDataCell
        headingKey={headingKey}
        columnNumber={index}
        rowNumber={rowNumber}
        spacingAlignment={spacingAlignment}
        spacingSize={spacingSize}
        tableRowData={tableRowData}
      ></SimpleTableDataCell>
    );
  });
};

export const createSelectableTableRow: CreateSelectableTableRow<Object> = ({
  rowKey,
  tableHeaderConfig,
  tableRowData,
  headingKeys,
  rowNumber,
  spacingSize,
  selectRow,
  selected,
}) => {
  const row = createTableRow({
    tableRowData,
    headingKeys,
    tableHeaderConfig,
    rowNumber,
    spacingSize,
  });

  const selectRowCell = (
    <SelectRowTableDataCell
      columnNumber={-1}
      rowNumber={rowNumber}
      rowKey={rowKey}
      spacingSize={spacingSize}
      // spacingAlignment={tableHeaderConfig[rowKey].spacingAlignment}
      spacingAlignment="LEFT" // TODO: Bug in the line above to fix :/
      tableRowData={tableRowData}
      selectRow={selectRow}
      selected={selected}
    ></SelectRowTableDataCell>
  );
  row.unshift(selectRowCell);

  return row;
};

/**
 * Creates the React components for all the rows in the table wrapped in a
 * body component
 */
export const createTableBody: CreateTableBody<Object> = ({
  tableHeaderConfig,
  tableData,
  headingKeys,
  spacingSize,
}) => {
  const rows = tableData.map((tableRowData, rowNumber) => (
    <TableRow key={rowNumber}>
      {createTableRow({
        tableHeaderConfig,
        tableRowData,
        headingKeys,
        rowNumber,
        spacingSize,
      })}
    </TableRow>
  ));
  return <TableBody>{rows}</TableBody>;
};

export const createSelectableTableBody: CreateSelectableTableBody<Object> = ({
  tableHeaderConfig,
  tableData,
  headingKeys,
  spacingSize,
  rowKey,
  selectRow,
  selectedRows,
}) => {
  const rows = tableData.map((tableRowData, rowNumber) => {
    const key = tableRowData[rowKey];
    const selected = selectedRows.includes(key);
    return (
      <TableRow key={key}>
        {createSelectableTableRow({
          rowKey,
          tableHeaderConfig,
          tableRowData,
          headingKeys,
          rowNumber,
          spacingSize,
          selectRow,
          selected,
        })}
      </TableRow>
    );
  });
  return <TableBody>{rows}</TableBody>;
};

/* *****************************************************
 *
 * PAGINATION
 *
 * *****************************************************/

/**
 * Verifies that it is safe to go to the previous page and then
 * calls the setPageNumber handler with the page to display.
 */
export const pageDown: PageDown = ({ pageNumber, setPageNumber }) => {
  // Important to avoid setting a page number below 1 !!!
  if (pageNumber === 1) {
    return;
  }
  setPageNumber(pageNumber - 1);
};

/**
 * Verifies that it is safe to go to the next page and then
 * calls the setPageNumber handler with page to display.
 */
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

/**
 * Gets a single page from the supplied data based on the given
 * page size and current page number.
 */
export const getPage: GetPage<Object> = ({
  tableData,
  pageNumber,
  pageSize,
}) => {
  // Imagine a page size of 3, 9 rows of data and a page number of 2...
  // Page 2 should be rows 3, 4 & 5 (zero-indexed)
  const firstRow = (pageNumber - 1) * pageSize; // (2 - 1) * 3 = 3
  const lastRow = firstRow + pageSize; // 3 + 3 = 6
  return tableData.slice(firstRow, lastRow); // Page is 3 -> 6
};

/**
 * Creates a React component to represent each page that is available.
 * These are buttons that should indicate the current page as well
 * as allow a new page to be selected.
 */
export const createPageButtons: CreatePageButtons = ({
  pageNumber,
  pageSize,
  totalRecords,
  setPageNumber,
}) => {
  const pageCount = Math.ceil(totalRecords / pageSize);
  const pageButtons = [];
  for (let i = 0; i < pageCount; i++) {
    const pageNumberToDisplay = i + 1;
    const label = pageNumberToDisplay.toString();
    // TODO: This key needs to be changed obviously! :)
    pageButtons.push(
      <Button
        key={label}
        label={label}
        onPress={() => setPageNumber(pageNumberToDisplay)}
        selected={pageNumberToDisplay === pageNumber}
      ></Button>
    );
  }
  return pageButtons;
};

/**
 * Creates a set of React components to use to control the pagination of a table.
 * These include back and next buttons as well as a button for each page that
 * is available to select.
 */
export const createPaginationControls: CreatePaginationControls<Object> = ({
  tableData,
  pageNumber,
  pageSize,
  totalRecords = tableData.length,
  setPageNumber,
}) => {
  const pageButtons = createPageButtons({
    pageNumber,
    pageSize,
    totalRecords,
    setPageNumber,
  });

  return (
    <Inline>
      <Button
        label="<"
        onPress={() => pageDown({ pageNumber, setPageNumber })}
        disabled={pageNumber === 1}
      ></Button>
      {pageButtons}
      <Button
        label=">"
        onPress={() =>
          pageUp({ pageNumber, pageSize, totalRecords, setPageNumber })
        }
        disabled={pageButtons.length === pageNumber}
      ></Button>
    </Inline>
  );
};

/* *****************************************************
 *
 * SORTING
 *
 * *****************************************************/

/**
 * Creates an object to use as the initial sorting state for a page.
 * This is currently simply based on the arguments provided but could
 * be expanded to make a selection of default sorting state.
 */
export const getInitialSortState: GetInitialSortState<Object> = ({
  sortAttribute,
  sortDirection,
}) => {
  return {
    sortAttribute,
    sortDirection,
  };
};

/**
 * Provides a way to determine what the next sort state should be based
 * on the sort action provided. The idea is that this should be reused to
 * ensure consistent sorting behaviour when using column headings.
 */
export const getNextSortState: GetNextSortState = ({
  sortState,
  nextSortAttribute,
}) => {
  const { sortDirection, sortAttribute } = sortState;

  if (sortAttribute !== nextSortAttribute) {
    // When a new attribute is selected for sorting, default to "ASCENDING"
    return {
      sortAttribute: nextSortAttribute,
      sortDirection: "ASCENDING",
    };
  } else if (sortDirection === "ASCENDING") {
    // If the same attribute is used, and currently 'ASCENDING', switch to descending
    return {
      sortAttribute,
      sortDirection: "DESCENDING",
    };
  } else if (sortDirection === "DESCENDING") {
    // If the same attribute is used, and currently 'DESCENDING', switch to no sorting
    return {
      sortAttribute,
      sortDirection: "ASCENDING",
    };
  }
  // Shouldn't get here, but just return the sortState provided...
  return sortState;
};

export const sortRows: SortRows<Object> = ({ sortState, tableData }) => {
  const { sortAttribute, sortDirection } = sortState;

  tableData.sort(function (a, b) {
    if (a[sortAttribute] < b[sortAttribute]) {
      return sortDirection === "ASCENDING" ? -1 : 1;
    } else if (a[sortAttribute] > b[sortAttribute]) {
      return sortDirection === "ASCENDING" ? 1 : -1;
    }
    return 0;
  });

  return tableData;
};
