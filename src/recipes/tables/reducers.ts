import { DefaultActionReducer, DEFAULT_ACTION, DynamicTableAction, DynamicTableState } from "./types";


// Example reducer template for when needed
const reduceDefault: DefaultActionReducer = ({ state, action }) => {
    return {
      ...state,
    };
  };


export function reducer(state: DynamicTableState, action: DynamicTableAction) {
    switch (action.type) {
      case DEFAULT_ACTION: {
        return reduceDefault({ state, action });
      }
      
      default:
        return state;
    }
  }