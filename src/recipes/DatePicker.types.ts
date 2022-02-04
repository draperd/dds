// @flow
import type { WeekData } from "./Calendar.types";
import type { DayData } from "./Calendar.types";

export const SHOW_PICKER_ACTION = "showPicker";
export const HIDE_PICKER_ACTION = "hidePicker";
export const ON_DAY_CHANGED_ACTION = "onDayChanged";
export const ON_MONTH_CHANGED_ACTION = "onMonthChanged";
export const ON_YEAR_CHANGED_ACTION = "onYearChanged";
export const SELECT_DATE_ACTION = "selectDate";
export const CLEAR_DATE_ACTION = "clearDate";
export const SET_CONSTRAINTS_ACTION = "setConstraints";

export type FormatDateOptions = any;

export type SetInitialFocusRef = (ref: any) => void;

export type DatesAreEqual = (args: { date1: Date, date2: Date }) => boolean;
export type DateIsBeforeFirstDateInMonth = (args: {
  currentDate: Date,
  firstDateInMonth: Date
}) => boolean;

export type DateIsAfterLastDateInMonth = (args: {
  currentDate: Date,
  lastDateInMonth: Date
}) => boolean;

export type CreateDayData = (args: {
  currentDate: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date,
  selectedDate: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => DayData;

export type GetFirstDayOfMonth = (date: Date) => number;
export type GetLastDateOfPreviousMonth = (date: Date) => number;

export type DateIsAvailable = (args: {
  date: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => boolean;

export type GetWeekData = (args: {
  date: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date,
  selectedDate: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => WeekData;

export type GetFirstDateOfWeek = (args: { date: Date }) => Date;

export type GetFirstDateInMonth = (args: { date: Date }) => Date;
export type GetLastDateInMonth = (args: { date: Date }) => Date;
export type GetNextDay = (args: { date: Date }) => Date;

export type GetMonthData = (args: {
  date: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => WeekData[];

export type OnChange = (value?: Date) => void;

export type State = {
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date,
  pickerIsVisible: boolean,
  isValid: boolean,
  proposedDate: Date,
  selectedDate?: Date,
  dayInputFieldValue: number, // | "",
  monthInputFieldValue: number, // | "",
  yearInputFieldValue: number, // | "",
  warning?: string,
  onChange?: OnChange
};

export type DatePickerProps = {
  id?: string,
  value?: Date,
  isDisabled?: boolean, // TODO: This needs handling
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date,
  onChange?: OnChange,
  label?: string
};
  
export type ShowPickerAction = {
  type: typeof SHOW_PICKER_ACTION
};

export type HidePickerAction = {
  type: typeof HIDE_PICKER_ACTION
};

export type OnDayChangedAction = {
  type: typeof ON_DAY_CHANGED_ACTION,
  payload: {
    value: number
  }
};
export type OnMonthChangedAction = {
  type: typeof ON_MONTH_CHANGED_ACTION,
  payload: {
    value: number
  }
};
export type OnYearChangedAction = {
  type: typeof ON_YEAR_CHANGED_ACTION,
  payload: {
    value: number
  }
};
export type SelectDateAction = {
  type: typeof SELECT_DATE_ACTION,
  payload: {
    date: Date
  }
};

export type SetConstraintsAction = {
  type: typeof SET_CONSTRAINTS_ACTION,
  payload: {
    earliestAllowedDate?: Date,
    latestAllowedDate?: Date
  }
};

export type ClearDateAction = {
  type: typeof CLEAR_DATE_ACTION
};

export type CreateShowPickerAction = () => ShowPickerAction;
export type CreateHidePickerAction = () => HidePickerAction;
export type CreateOnDayChangedAction = (args: {
  value: number
}) => OnDayChangedAction;
export type CreateOnMonthChangedAction = (args: {
  value: number
}) => OnMonthChangedAction;
export type CreateOnYearChangedAction = (args: {
  value: number
}) => OnYearChangedAction;
export type CreateSelectDateAction = (args: { date: Date }) => SelectDateAction;
export type CreateClearDateAction = () => ClearDateAction;
export type CreateSetConstraintsAction = (args: {
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => SetConstraintsAction;

export type OnChangeCreateAction =
  | CreateOnDayChangedAction
  | CreateOnMonthChangedAction
  | CreateOnYearChangedAction;
export type InputFieldStateValue =
  | "dayInputFieldValue"
  | "monthInputFieldValue"
  | "yearInputFieldValue";

export type Action =
  | HidePickerAction
  | ShowPickerAction
  | OnDayChangedAction
  | OnMonthChangedAction
  | OnYearChangedAction
  | SelectDateAction
  | ClearDateAction
  | SetConstraintsAction;

export type DispatchAction = (args: Action) => void;

export type ContextType = {
  dispatch: DispatchAction,
  state: State
};

export type CreateContext = (args: {
  state: State,
  dispatch: DispatchAction
}) => ContextType;

export type GetNewProposedDate = (args: {
  proposedDate: Date,
  value: number
}) => Date;

export type ReduceDatePartChanged = (args: {
  state: State,
  action: OnDayChangedAction | OnMonthChangedAction | OnYearChangedAction,
  getNewProposedDate: GetNewProposedDate,
  inputFieldStateValue: InputFieldStateValue
}) => State;

export type ReduceOnDayChanged = (args: {
  state: State,
  action: OnDayChangedAction
}) => State;

export type ReduceOnMonthChanged = (args: {
  state: State,
  action: OnMonthChangedAction
}) => State;

export type ReduceOnYearChanged = (args: {
  state: State,
  action: OnYearChangedAction
}) => State;

export type ReduceHidePicker = (args: {
  state: State,
  action: HidePickerAction
}) => State;

export type ReduceShowPicker = (args: {
  state: State,
  action: ShowPickerAction
}) => State;

export type ReduceSelectDate = (args: {
  state: State,
  action: SelectDateAction
}) => State;

export type ReduceClearDate = (args: {
  state: State,
  action: ClearDateAction
}) => State;

export type ReduceSetConstraints = (args: {
  state: State,
  action: SetConstraintsAction
}) => State;
