// @flow
import {
    CreateClearDateAction,
    CreateHidePickerAction,
    CreateShowPickerAction,
    CreateOnDayChangedAction,
    CreateOnMonthChangedAction,
    CreateOnYearChangedAction,
    CreateSelectDateAction,
    CreateSetConstraintsAction,
    CLEAR_DATE_ACTION,
    HIDE_PICKER_ACTION,
    SHOW_PICKER_ACTION,
    ON_DAY_CHANGED_ACTION,
    ON_MONTH_CHANGED_ACTION,
    ON_YEAR_CHANGED_ACTION,
    SELECT_DATE_ACTION,
    SET_CONSTRAINTS_ACTION
  } from "./DatePicker.types";
  
  export const createHidePickerAction: CreateHidePickerAction = () => {
    return {
      type: HIDE_PICKER_ACTION
    };
  };
  
  export const createShowPickerAction: CreateShowPickerAction = () => {
    return {
      type: SHOW_PICKER_ACTION
    };
  };
  
  export const createOnDayChangedAction: CreateOnDayChangedAction = ({
    value
  }) => {
    return {
      type: ON_DAY_CHANGED_ACTION,
      payload: {
        value
      }
    };
  };
  
  export const createOnMonthChangedAction: CreateOnMonthChangedAction = ({
    value
  }) => {
    return {
      type: ON_MONTH_CHANGED_ACTION,
      payload: {
        value
      }
    };
  };
  
  export const createOnYearChangedAction: CreateOnYearChangedAction = ({
    value
  }) => {
    return {
      type: ON_YEAR_CHANGED_ACTION,
      payload: {
        value
      }
    };
  };
  
  export const createSelectDateAction: CreateSelectDateAction = ({ date }) => {
    return {
      type: SELECT_DATE_ACTION,
      payload: {
        date
      }
    };
  };
  
  export const createClearDateAction: CreateClearDateAction = () => {
    return {
      type: CLEAR_DATE_ACTION
    };
  };
  
  export const createSetConstraintsAction: CreateSetConstraintsAction = ({
    earliestAllowedDate,
    latestAllowedDate
  }) => {
    return {
      type: SET_CONSTRAINTS_ACTION,
      payload: {
        earliestAllowedDate,
        latestAllowedDate
      }
    };
  };
  