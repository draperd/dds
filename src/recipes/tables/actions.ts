import { SelectRowTableAction, SELECT_ROW_ACTION } from "./reducers";
import { Propertyof } from "./types";

export type CreateSelectRowAction<T> = (args: {
  key: Propertyof<T>;
  selected: boolean;
}) => SelectRowTableAction<T>;

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
