import {
  SelectRowsTableAction,
  SelectRowTableAction,
  SELECT_ROWS_ACTION,
  SELECT_ROW_ACTION,
} from "./reducers";
import { Propertyof, SelectRowsOption } from "./types";

export type CreateSelectRowAction<T> = (args: {
  key: Propertyof<T>;
  selected: boolean;
}) => SelectRowTableAction<T>;

export type CreateSelectRowsAction<T> = (args: {
  rowKey: keyof T;
  select: SelectRowsOption;
}) => SelectRowsTableAction<T>;

export const createSelectRowAction: CreateSelectRowAction<Object> = ({
  key,
  selected,
}) => {
  return {
    type: SELECT_ROW_ACTION,
    key,
    selected,
  };
};

export const createSelectRowsAction: CreateSelectRowsAction<Object> = ({
  rowKey,
  select,
}) => {
  return {
    type: SELECT_ROWS_ACTION,
    rowKey,
    select,
  };
};
