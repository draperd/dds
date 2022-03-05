import {
  DefaultActionReducer,
  DEFAULT_ACTION,
  TableAction,
  TableState,
} from "./types";

// Reduce behaviour
// 1. Handle page update (loading states?) -> reset row selection?
// 2. Handle page size change
// 3. Handle sort change (reset pagination? reload data?)
// 4. Handle row selection -> update header selection?
// 5. Handle all rows selected / all rows deselected

// Example reducer template for when needed
const reduceDefault: DefaultActionReducer = ({ state, action }) => {
  return {
    ...state,
  };
};

export function reducer(state: TableState, action: TableAction) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return reduceDefault({ state, action });
    }

    default:
      return state;
  }
}
