/* 
    So the options for a table are going to be:
    1. Don't need any, just going to build one myself from the primitives
    2. Going to provide a full set of data, please do everything for me
    3. Going to provide functions for fetching data, please prompt for pagination, filtering, etc

    What can a table do?
    1. Sort on columns
    2. Filter results (across all cells or on specific column)
    3. Re-order rows
    4. Select rows
    5. ?

    Other features to consider:
    1. Sticky header?
    2. Infinite scroll?
    3. ?

    You might want to provide a custom heading cell? Do this as a function?

*/

import { ReactElement } from "react";
import { SpacingAlignment, SpacingSize } from "../../foundations/Spacing";
import { TernaryCheckedState } from "../TernaryCheckbox";

/* *****************************************************
 *
 * TABLE HEADERS
 *
 * *****************************************************/

export type HeadingKey = string;

export type GetHeadingKeys<T> = (args: {
  tableHeaderConfig: TableHeaderConfig<T>;
}) => HeadingKey[];

export interface TableHeaderCellConfig {
  index: boolean; // Not sure if this is needed
  sortable: boolean;
  label: string;
  spacingAlignment?: SpacingAlignment;
}

export type TableHeaderConfig<T> = {
  [Property in keyof T]?: TableHeaderCellConfig;
};

export type CreateTableHeaderCell = (args: {
  headingKey: string;
  headerConfig: TableHeaderCellConfig;
  sortState: SortState;
  setSortState: SetSortState;
  spacingSize: SpacingSize;
}) => ReactElement;

export type CreateSimpleTableHeader<T> = (args: {
  tableHeaderConfig: TableHeaderConfig<T>;
  spacingSize: SpacingSize;
}) => ReactElement;

export type CreateSelectableTableHeader<T> = (args: {
  rowKey: keyof T;
  tableData: T[];
  tableHeaderConfig: TableHeaderConfig<T>;
  spacingSize: SpacingSize;
  selectRows: SelectRows<T>;
  selectedRows: Propertyof<T>[];
}) => ReactElement;

export type CreateTableHeader<T> = (args: {
  tableHeaderConfig: TableHeaderConfig<T>;
  sortState: SortState;
  setSortState: SetSortState;
  spacingSize: SpacingSize;
}) => ReactElement;

/* *****************************************************
 *
 * TABLE ROWS
 *
 * *****************************************************/

export type CreateTableRow<T> = (args: {
  tableRowData: T;
  headingKeys: HeadingKey[];
  tableHeaderConfig: TableHeaderConfig<T>;
  rowNumber: number;
  spacingSize: SpacingSize;
}) => ReactElement[];

export type CreateSelectableTableRow<T> = (args: {
  rowKey: HeadingKey;
  tableRowData: T;
  headingKeys: HeadingKey[];
  tableHeaderConfig: TableHeaderConfig<T>;
  rowNumber: number;
  spacingSize: SpacingSize;
  selectRow: SelectRow<T>;
  selected: boolean;
}) => ReactElement[];

export type CreateTableBody<T> = (args: {
  tableData: T[];
  headingKeys: HeadingKey[];
  tableHeaderConfig: TableHeaderConfig<T>;
  spacingSize: SpacingSize;
}) => ReactElement;

export type CreateSelectableTableBody<T> = (args: {
  rowKey: HeadingKey;
  tableData: T[];
  headingKeys: HeadingKey[];
  tableHeaderConfig: TableHeaderConfig<T>;
  spacingSize: SpacingSize;
  selectRow: SelectRow<T>;
  selectedRows: Propertyof<T>[];
}) => ReactElement;

/* *****************************************************
 *
 * SORTING
 *
 * *****************************************************/

export type SortDirection = "ASCENDING" | "DESCENDING";

export type GetInitialSortState<T> = (args: {
  sortAttribute: keyof T;
  sortDirection: SortDirection;
}) => SortState;

export type SortState = {
  sortDirection: SortDirection;
  sortAttribute: string;
};

export type SetSortState = (sortState: SortState) => void;

export type GetNextSortState = (args: {
  sortState: SortState;
  nextSortAttribute: string;
}) => SortState;

export type SortRows<T> = (args: {
  sortState: SortState;
  tableData: T[];
}) => T[];

/* *****************************************************
 *
 * PAGINATION
 *
 * *****************************************************/

export type GetPage<T> = (args: {
  tableData: T[];
  pageNumber: number;
  pageSize: number;
}) => T[];

export type PageDown = (args: {
  pageNumber: number;
  setPageNumber: SetPageNumber;
}) => void;
export type PageUp = (args: {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  setPageNumber: SetPageNumber;
}) => void;

export type SetPageNumber = (args: number) => void;

export type CreatePageButtons = (args: {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  setPageNumber: SetPageNumber;
}) => ReactElement[];

export type CreatePaginationControls<T> = (args: {
  tableData: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords?: number;
  setPageNumber: SetPageNumber;
}) => ReactElement;

/* *****************************************************
 *
 * SELECTING
 *
 * *****************************************************/

export type SelectRowsOption = "NONE" | "ALL";

export type GetSelectedRowsState<T> = (args: {
  tableData: T[];
  selectedRows: Propertyof<T>[];
}) => TernaryCheckedState;

export type SelectRow<T> = (args: {
  key: Propertyof<T>;
  selected: boolean;
}) => void;

export type SelectRows<T> = (args: {
  rowKey: keyof T;
  select: SelectRowsOption;
}) => void;

/* *****************************************************
 *
 * COMPONENTS
 *
 * *****************************************************/

export interface SimpleTableHeaderCellProps {
  headingKey: HeadingKey;
  spacingSize?: SpacingSize;
  tableHeaderCellConfig: TableHeaderCellConfig;
}

export interface SelectableTableHeaderCellProps<T> {
  headingKey: HeadingKey;
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
  rowKey: keyof T;
  selectRows: SelectRows<T>;
  selected: TernaryCheckedState;
}

export interface SimpleTableDataCellProps<T> {
  tableRowData: T;
  headingKey: HeadingKey;
  rowNumber: number;
  columnNumber: number;
  spacingSize: SpacingSize;
  spacingAlignment: SpacingAlignment;
}

export interface SelectRowTableDataCellProps<T> {
  rowKey: HeadingKey;
  tableRowData: T;
  rowNumber: number;
  columnNumber: number;
  spacingSize: SpacingSize;
  spacingAlignment: SpacingAlignment;
  selectRow: SelectRow<T>;
  selected: boolean;
}

export interface SortableTableHeaderCellProps
  extends SimpleTableHeaderCellProps {
  sortState: SortState;
  setSortState: SetSortState;
}

export interface InMemoryTableProps<T> {
  tableHeaderConfig: TableHeaderConfig<T>;
  tableData: T[];
  spacingSize?: SpacingSize;
}

export interface InMemoryPaginatedTableProps<T> extends InMemoryTableProps<T> {
  sortAttribute: keyof T;
  sortDirection: SortDirection;
  pageSize: number;
}

export interface AsyncPaginatedTableProps<T> {
  tableHeaderConfig: TableHeaderConfig<T>;
  spacingSize?: SpacingSize;
  sortAttribute: keyof T;
  sortDirection: SortDirection;
  pageSize: number;
  dataUrl: string;
  countAttribute: string;
  resultsAttribute: string;
}

export interface ComposedTableProps {
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
}

export interface SelectableTableProps<T> extends InMemoryTableProps<T> {
  rowKey: keyof T;
  // sortAttribute: keyof T;
  // sortDirection: SortDirection;
  // pageSize: number;
}

/* *****************************************************
 *
 * STATE and ACTIONS
 *
 * *****************************************************/

export type DynamicTableProps = {};

export type Propertyof<T> = T[keyof T];

export type TableState<T> = {
  tableData: T[];
  totalRows: number;
  currentPage: number;
  pageSize: number;
  sortAttribute?: string;
  sortDirection?: SortDirection;
  selectedRows: Propertyof<T>[];
};
