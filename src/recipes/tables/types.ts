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
    1. Stick header?
    2. ?

    You might want to provide a custom heading cell? Do this as a function?

*/

import { ReactElement } from "react";

export type TableHeadCell = {
    content: string;
}

export type TableHead = TableHeadCell[];

// export type Table = {
//     headerConfig: TableHeaderData
//     tableData: Object[];
// }

export type TableHeaderCellConfig = {
    id: string,
    content: string,
};
export type TableHeaderCongfig = TableHeaderCellConfig[];

export type TableRowCellData = string;
export type TableRowData = TableRowCellData[];
export type TableData = TableRowData[];

// Create React elements for the table heading
export type CreateTableHeader = (args: { tableHeaderConfig: TableHeaderCongfig}) => ReactElement[];


export type CreateTableRow = (args: { tableRowData: TableRowData, rowNumber: number}) => ReactElement[];
export type CreateTableRows = (args: { tableData: TableData}) => ReactElement[];




export type RenderHeadCell = (args: { columnNumber: number}) => ReactElement | void; // Allow void to be returned so that data can be used to create some cells
export type RenderDataCell = (args: { columnNumber: number, key: string | number}) => ReactElement | void;

export type TablePageData = {
    page: number,
    data: TableData,
    pageCount: number,
    pageSize: number,
    // What about sort ... column and direction?
}

export type FetchTablePage = (args: { page: number, pageSize: number }) => TableData;


export type DynamicTableProps = {
    head?: TableHead; // The data for the heading, probably needs a better name
    data?: TableData; // the data for the table body
    renderHeadCell?: RenderHeadCell; // A function for rendering a TH
    renderDataCell?: RenderDataCell; // A function for rendering a TD
    fetchPage?: FetchTablePage

    // What about re-ordering?
}

// An "in memory" table is a table that does not fetch data from a service or server. All the data
// is loaded into memory when created.
export type InMemoryTableProps = {
    tableHeaderConfig: TableHeaderCongfig,
    tableData: TableData
}




// Should all tables have state? :/ 

export type DynamicTableState = {

}

export const DEFAULT_ACTION = "default";

export type DefaultActionReducer = (args: { state: DynamicTableState, action: DynamicTableAction}) => DynamicTableState;

export type DefaultDynamicTableAction = {
    type: typeof DEFAULT_ACTION
}

export type DynamicTableAction = DefaultDynamicTableAction;