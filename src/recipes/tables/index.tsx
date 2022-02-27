import React, { useReducer, createContext } from "react";

import { reducer } from "./reducers";
import {
  DynamicTableProps,
  DynamicTableState,
  InMemoryTableProps,
  CreateTableHeader,
  CreateTableRow,
  CreateTableRows,
} from "./types";

import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../html/Table";

// TODO Probably want to define a type for table context here
export const TableContext = React.createContext({});

// Hate the name DynamicTable, but it'll do for now... grrr
export const DynamicTable = (props: DynamicTableProps) => {
  const {} = props;

  const initialState: DynamicTableState = {};
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  // Things to consider...
  // 1. Is data provided?
  // 2. Are functions provided?
  // 3. Can both be provided?

  return <TableContext.Provider value={context}></TableContext.Provider>;
};

const createTableHeader: CreateTableHeader = ({ tableHeaderConfig }) => {
  return tableHeaderConfig.map((tableHeader) => {
    const { id, content } = tableHeader;
    return <TableHeadCell key={id}>{content}</TableHeadCell>;
  });
};

const createTableRow: CreateTableRow = ({ tableRowData, rowNumber }) => {
  return tableRowData.map((tableCell, cellNumber) => (
    <TableDataCell key={`${rowNumber}_${cellNumber}`}>
      {tableCell}
    </TableDataCell>
  ));
};

const createTableRows: CreateTableRows = ({ tableData }) => {
  return tableData.map((tableRowData, rowNumber) => (
    <TableRow key={rowNumber}>
      {createTableRow({ tableRowData, rowNumber })}
    </TableRow>
  ));
};

export const InMemoryTable = (props: InMemoryTableProps) => {
  const { tableHeaderConfig, tableData } = props;
  const heading = createTableHeader({ tableHeaderConfig });
  const rows = createTableRows({ tableData });

  return (
    <Table>
      <TableHead>
        <TableRow>{heading}</TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};
