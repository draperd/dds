import { TableState, Propertyof } from "./types";

export const SET_PAGE_NUMBER_ACTION = "SetPage";
export const SET_PAGE_SIZE_ACTION = "SetPageSize";
export const SELECT_ROW_ACTION = "SelectRow";
export const SELECT_ROWS_ACTION = "SelectRows";

export type SetPageTableAction = {
  type: typeof SET_PAGE_NUMBER_ACTION;
  pageNumber: number;
};

export type SetPageSizeTableAction = {
  type: typeof SET_PAGE_SIZE_ACTION;
  pageSize: number;
};

export type SelectRowTableAction<T> = {
  type: typeof SELECT_ROW_ACTION;
  key: Propertyof<T>;
  selected: boolean;
};

export type SelectRowsTableAction<T> = {
  type: typeof SELECT_ROWS_ACTION;
  select: "NONE" | "ALL";
  rowKey: keyof T;
};

export type TableAction<T> =
  | SetPageTableAction
  | SetPageSizeTableAction
  | SelectRowTableAction<T>
  | SelectRowsTableAction<T>;

export type SetPageNumberReducer<T> = (args: {
  state: TableState<T>;
  action: SetPageTableAction;
}) => TableState<T>;

export type SetPageSizeReducer<T> = (args: {
  state: TableState<T>;
  action: SetPageSizeTableAction;
}) => TableState<T>;

export type SelectRowReducer<T> = (args: {
  state: TableState<T>;
  action: SelectRowTableAction<T>;
}) => TableState<T>;

export type SelectRowsReducer<T> = (args: {
  state: TableState<T>;
  action: SelectRowsTableAction<T>;
}) => TableState<T>;

// Reduce behaviour
// 1. Handle page update (loading states?) -> reset row selection?
// 2. Handle page size change
// 3. Handle sort change (reset pagination? reload data?)
// 4. Handle row selection -> update header selection?
// 5. Handle all rows selected / all rows deselected

const reduceSetPageNumber: SetPageNumberReducer<Object> = ({
  state,
  action,
}) => {
  // TODO: For async tables we'll need to load different data
  const { pageNumber } = action;
  return {
    ...state,
    pageNumber,
  };
};

const reduceSetPageSize: SetPageSizeReducer<Object> = ({ state, action }) => {
  // TODO: For async tables we'll need to load more data
  const { pageSize } = action;
  return {
    ...state,
    pageNumber: 1, // Reset the page number
    pageSize,
  };
};

const reduceSelectRow: SelectRowReducer<Object> = ({ state, action }) => {
  // TODO: For async tables we'll need to load more data
  const { selectedRows } = state;
  const { key, selected } = action;

  const indexOfKey = selectedRows.findIndex((row) => row === key);
  if (selected) {
    if (indexOfKey === -1) {
      // The key is not currently in the array of selected rows so it needs to be added
      return {
        ...state,
        selectedRows: [...selectedRows, key],
      };
    } else {
      // No action, key is already in the array of selected rows
      return { ...state };
    }
  } else {
    if (indexOfKey === -1) {
      // Key is not in the array, so nothing to remove...
      return { ...state };
    } else {
      return {
        ...state,
        selectedRows: [
          ...selectedRows.slice(0, indexOfKey),
          ...selectedRows.slice(indexOfKey + 1),
        ],
      };
    }
  }
};

const reduceSelectRows: SelectRowsReducer<Object> = ({ state, action }) => {
  const { tableData } = state;
  const { select, rowKey } = action;
  switch (select) {
    case "NONE": {
      return {
        ...state,
        selectedRows: [],
      };
    }
    case "ALL": {
      const selectedRows: Propertyof<Object>[] = tableData.map(
        (row) => row[rowKey]
      );
      return {
        ...state,
        selectedRows,
      };
    }
  }
  return state;
};

export function reducer(
  state: TableState<Object>,
  action: TableAction<Object>
) {
  switch (action.type) {
    case SET_PAGE_NUMBER_ACTION: {
      return reduceSetPageNumber({ state, action });
    }
    case SET_PAGE_SIZE_ACTION: {
      return reduceSetPageSize({ state, action });
    }
    case SELECT_ROW_ACTION: {
      return reduceSelectRow({ state, action });
    }
    case SELECT_ROWS_ACTION: {
      return reduceSelectRows({ state, action });
    }

    default:
      return state;
  }
}
