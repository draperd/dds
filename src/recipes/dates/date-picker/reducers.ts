import type {
    Action,
    DateIsAvailable,
    GetNewProposedDate,
    ReduceHidePicker,
    ReduceShowPicker,
    ReduceDatePartChanged,
    ReduceOnDayChanged,
    ReduceOnMonthChanged,
    ReduceOnYearChanged,
    ReduceSelectDate,
    ReduceClearDate,
    ReduceSetConstraints,
    State
  } from "../types";
  import {
    CLEAR_DATE_ACTION,
    HIDE_PICKER_ACTION,
    SHOW_PICKER_ACTION,
    ON_DAY_CHANGED_ACTION,
    ON_MONTH_CHANGED_ACTION,
    ON_YEAR_CHANGED_ACTION,
    SELECT_DATE_ACTION,
    SET_CONSTRAINTS_ACTION
  } from "../types";
  
  
  export const dateIsAvailable: DateIsAvailable = ({
      date,
      earliestAllowedDate,
      latestAllowedDate
    }) => {
      if (earliestAllowedDate && earliestAllowedDate > date) {
        return false;
      }
      if (latestAllowedDate && latestAllowedDate < date) {
        return false;
      }
      return true;
    };
  
  export const getNewProposedDateForDayChange: GetNewProposedDate = ({
    proposedDate,
    value
  }) => {
    return new Date(proposedDate.getFullYear(), proposedDate.getMonth(), value);
  };
  
  export const getNewProposedDateForMonthChange: GetNewProposedDate = ({
    proposedDate,
    value
  }) => {
    return new Date(
      proposedDate.getFullYear(),
      value - 1,
      proposedDate.getDate()
    );
  };
  
  export const getNewProposedDateForYearChange: GetNewProposedDate = ({
    proposedDate,
    value
  }) => {
    return new Date(value, proposedDate.getMonth(), proposedDate.getDate());
  };
  
  const reduceDatePartChanged: ReduceDatePartChanged = ({
    state,
    action,
    getNewProposedDate,
    inputFieldStateValue
  }) => {
    const { proposedDate, earliestAllowedDate, latestAllowedDate } = state;
    let {
      payload: { value }
    } = action;
  
    // TODO: Ideally need to do a better job handling strange characters:
    //       - ignore zeros
    //       - could we always have 2 character day and month? (with leading zeroes)
    if (isNaN(value)) {
      return {
        ...state,
        isValid: false,
        warning: "You need to provide a full date",
        [inputFieldStateValue]: value
      };
    }
  
    const updatedProposedDate = getNewProposedDate({ proposedDate, value });
  
    if (
      !dateIsAvailable({
        date: updatedProposedDate,
        earliestAllowedDate,
        latestAllowedDate
      })
    ) {
      return {
        ...state,
        isValid: false,
        warning: "You need to select a date within the allowed range",
        proposedDate: updatedProposedDate,
        dayInputFieldValue: updatedProposedDate.getDate(),
        monthInputFieldValue: updatedProposedDate.getMonth() + 1,
        yearInputFieldValue: updatedProposedDate.getFullYear()
      };
    }
  
    return {
      ...state,
      isValid: true,
      warning: "",
      proposedDate: updatedProposedDate,
      dayInputFieldValue: updatedProposedDate.getDate(),
      monthInputFieldValue: updatedProposedDate.getMonth() + 1,
      yearInputFieldValue: updatedProposedDate.getFullYear()
    };
  };
  
  const reduceOnDayChanged: ReduceOnDayChanged = ({ state, action }) => {
    return reduceDatePartChanged({
      state,
      action,
      getNewProposedDate: getNewProposedDateForDayChange,
      inputFieldStateValue: "dayInputFieldValue"
    });
  };
  
  const reduceOnMonthChanged: ReduceOnMonthChanged = ({ state, action }) => {
    return reduceDatePartChanged({
      state,
      action,
      getNewProposedDate: getNewProposedDateForMonthChange,
      inputFieldStateValue: "monthInputFieldValue"
    });
  };
  
  const reduceOnYearChanged: ReduceOnYearChanged = ({ state, action }) => {
    let {
      payload: { value }
    } = action;
    if (value < 1000) {
      return {
        ...state,
        isValid: false,
        warning: "You need to provide a full date",
        yearInputFieldValue: value
      };
    }
    return reduceDatePartChanged({
      state,
      action,
      getNewProposedDate: getNewProposedDateForYearChange,
      inputFieldStateValue: "yearInputFieldValue"
    });
  };
  
  const reduceHidePicker: ReduceHidePicker = ({ state, action }) => {
    const { isValid, proposedDate } = state;
  
    if (!isValid) {
      // If the picker isn't in a valid date when it's closed we need to ensure that
      // it's reset. The proposed date should still be a valid date because it only gets
      // updated when valid input is provided. It's important to reset validity and
      // clear warnings and get back to a healthy state
      return {
        ...state,
        proposedDate,
        isValid: true,
        warning: "",
        pickerIsVisible: false,
        dayInputFieldValue: proposedDate.getDate(),
        monthInputFieldValue: proposedDate.getMonth() + 1,
        yearInputFieldValue: proposedDate.getFullYear()
      };
    }
  
    return {
      ...state,
      pickerIsVisible: false
    };
  };
  
  const reduceShowPicker: ReduceShowPicker = ({ state, action }) => {
    return {
      ...state,
      pickerIsVisible: true
    };
  };
  
  const reduceSelectDate: ReduceSelectDate = ({ state, action }) => {
    let {
      payload: { date }
    } = action;
    const { earliestAllowedDate, latestAllowedDate } = state;
  
    // Don't allow dates to be set if they are unavailable!
    if (
      !dateIsAvailable({
        date,
        earliestAllowedDate,
        latestAllowedDate
      })
    ) {
      return state;
    }
  
    const { onChange } = state;
    if (onChange && typeof onChange === "function") {
      onChange(date);
    }
  
    return {
      ...state,
      pickerIsVisible: false,
      warning: "",
      isValid: true,
      selectedDate: date,
      proposedDate: date,
      dayInputFieldValue: date.getDate(),
      monthInputFieldValue: date.getMonth() + 1,
      yearInputFieldValue: date.getFullYear()
    };
  };
  
  const reduceClearDate: ReduceClearDate = ({ state, action }) => {
    // It is important to call the onChange callback on clearing as well as setting...
    const { onChange } = state;
    if (onChange && typeof onChange === "function") {
      onChange(undefined);
    }
  
    const date = new Date();
    return {
      ...state,
      pickerIsVisible: false,
      selectedDate: undefined,
      proposedDate: date,
      dayInputFieldValue: date.getDate(),
      monthInputFieldValue: date.getMonth() + 1,
      yearInputFieldValue: date.getFullYear()
    };
  };
  
  export const reduceSetConstraints: ReduceSetConstraints = ({
    state,
    action
  }) => {
    // TODO: There is a potential issue here if the constraint makes the selected date invalid !
    //       - One option would be to just bring the date within the constraint
    const {
      payload: { earliestAllowedDate, latestAllowedDate }
    } = action;
    return {
      ...state,
      earliestAllowedDate,
      latestAllowedDate
    };
  };
  
  export function reducer(state: State, action: Action) {
    switch (action.type) {
      case HIDE_PICKER_ACTION: {
        return reduceHidePicker({ state, action });
      }
      case SHOW_PICKER_ACTION: {
        return reduceShowPicker({ state, action });
      }
      case ON_DAY_CHANGED_ACTION: {
        return reduceOnDayChanged({ state, action });
      }
      case ON_MONTH_CHANGED_ACTION: {
        return reduceOnMonthChanged({ state, action });
      }
      case ON_YEAR_CHANGED_ACTION: {
        return reduceOnYearChanged({ state, action });
      }
      case SELECT_DATE_ACTION: {
        return reduceSelectDate({ state, action });
      }
      case CLEAR_DATE_ACTION: {
        return reduceClearDate({ state, action });
      }
      case SET_CONSTRAINTS_ACTION: {
        return reduceSetConstraints({ state, action });
      }
      default:
        return state;
    }
  }
  