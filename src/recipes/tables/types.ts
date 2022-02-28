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

export interface TableHeaderCellConfig {
    index: boolean,      // Not sure if this is needed
    sortable: boolean,
    label: string,
}

export type TableHeaderConfig<T> = {
    [Property in keyof T]?: TableHeaderCellConfig
}


// Create React elements for the table heading
export type CreateTableHeader<T> = (args: { tableHeaderConfig: TableHeaderConfig<T>, sortState: SortState, setSortState: SetSortState}) => ReactElement[];

export type HeadingKey = string;

export type GetHeadingKeys<T> = (args: { tableHeaderConfig: TableHeaderConfig<T> }) => HeadingKey[];

export type CreateTableRow<T> = (args: { tableRowData: T, headingKeys: HeadingKey[], rowNumber: number}) => ReactElement[];
export type CreateTableRows<T> = (args: { tableData: T[], headingKeys: HeadingKey[]}) => ReactElement[];
export type CreatePageButtons = (args: { pageSize: number, totalRecords: number, setPageNumber: SetPageNumber}) => ReactElement[];

export type SortDirection = 'ASCENDING' | 'DESCENDING';

export type GetInitialSortState<T> = (args: { sortAttribute: keyof T, sortDirection: SortDirection}) => SortState;



// Not keen on the name SortState here :/
export type SortState = {
    sortDirection: SortDirection,
    sortAttribute: string,
}

export type SetSortState = (sortState: SortState) => void;

// Create a predictable sort process...
export type GetNextSortState = (args: {sortState: SortState, nextSortAttribute: string}) => SortState;

export type SortRows<T> = (args: {sortState: SortState, tableData: T[]}) => T[];




export type CreateTableHeaderCell = (args: { headingKey: string, headerConfig: TableHeaderCellConfig, sortState: SortState, setSortState: SetSortState }) => ReactElement;



// export type RenderHeadCell = (args: { columnNumber: number}) => ReactElement | void; // Allow void to be returned so that data can be used to create some cells
// export type RenderDataCell = (args: { columnNumber: number, key: string | number}) => ReactElement | void;

// export type TablePageData = {
//     page: number,
//     data: TableData,
//     pageCount: number,
//     pageSize: number,
//     // What about sort ... column and direction?
// }

// export type FetchTablePage = (args: { page: number, pageSize: number }) => TableData;


// export type DynamicTableProps = {
//     head?: TableHead; // The data for the heading, probably needs a better name
//     data?: TableData; // the data for the table body
//     renderHeadCell?: RenderHeadCell; // A function for rendering a TH
//     renderDataCell?: RenderDataCell; // A function for rendering a TD
//     fetchPage?: FetchTablePage

//     // What about re-ordering?
// }

// An "in memory" table is a table that does not fetch data from a service or server. All the data
// is loaded into memory when created.
export interface InMemoryTableProps<T> {
    tableHeaderConfig: TableHeaderConfig<T>,
    tableData: T[],
    sortAttribute: keyof T,
    sortDirection: SortDirection
}

export type InMemoryTableComponent<T> = (args: InMemoryTableProps<T>) => ReactElement;

export interface InMemoryPaginatedTableProps<T> extends InMemoryTableProps<T> {
    pageSize: number,
}


// export interface InMemoryPaginatedSortableTableProps<T> extends InMemoryPaginatedTableProps<T> {
//     sortAttribute: [keyof T],
//     sortDirection: SortDirection,
// }




export type GetPage<T> = (args: { tableData: T[], pageNumber: number, pageSize: number }) => T[]

export type PageDown = (args: { pageNumber: number, setPageNumber: SetPageNumber }) => void;
export type PageUp = (args: { pageNumber: number, pageSize: number, totalRecords: number, setPageNumber: SetPageNumber }) => void;

export type SetPageNumber = (args: number) => void;


// Should all tables have state? :/ 

export type DynamicTableState = {

}

export const DEFAULT_ACTION = "default";

export type DefaultActionReducer = (args: { state: DynamicTableState, action: DynamicTableAction}) => DynamicTableState;

export type DefaultDynamicTableAction = {
    type: typeof DEFAULT_ACTION
}

export type DynamicTableAction = DefaultDynamicTableAction;