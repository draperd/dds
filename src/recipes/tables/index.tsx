import React, { useReducer, createContext } from "react";

import { reducer } from "./reducers";
import { DynamicTableProps, DynamicTableState } from "./types";

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
