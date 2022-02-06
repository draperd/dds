import React, { useReducer, createContext } from "react";
import Popup from "@atlaskit/popup";
import { Box } from "../primitives/Box";
import { Inline } from "../primitives/Inline";
import { Spread } from "../primitives/Spread";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import { Button } from "./Button";

import { Calendar } from "./Calendar";
import { NumberSpinner } from "./NumberSpinner";

import {
  createClearDateAction,
  createHidePickerAction,
  createSelectDateAction,
  createShowPickerAction,
  createOnDayChangedAction,
  createOnMonthChangedAction,
  createOnYearChangedAction,
} from "./DatePickerActions";
import { reducer } from "./DatePickerReducer";
import {
  DispatchAction,
  FormatDateOptions,
  OnChange,
  SetInitialFocusRef,
  State,
} from "./DatePicker.types";

interface DatePickerProps {
  id?: string;
  value?: Date;
  isDisabled?: boolean; // TODO: This needs handling
  earliestAllowedDate?: Date;
  latestAllowedDate?: Date;
  onChange?: OnChange;
  label?: string;
}

interface DatePickerEditDisplayProps {
  dispatch: DispatchAction;
  state: State;
  label: string;
  locale?: string;
  formatDateOptions: FormatDateOptions;
  id?: string;
  setInitialFocusRef: SetInitialFocusRef;
}

export const DatePickerContext = React.createContext({});

export const DatePickerEditDisplay = ({
  dispatch,
  state,
}: DatePickerEditDisplayProps) => (
  <Box>
    <Stack>
      <Spread>
        <NumberSpinner
          id="DAY"
          label="Day"
          value={state.dayInputFieldValue}
          onChange={(value) => dispatch(createOnDayChangedAction({ value }))}
        ></NumberSpinner>
        <NumberSpinner
          id="MONTH"
          label="Month"
          value={state.monthInputFieldValue}
          onChange={(value) => dispatch(createOnMonthChangedAction({ value }))}
        ></NumberSpinner>
        <NumberSpinner
          id="YEAR"
          label="Year"
          value={state.yearInputFieldValue}
          onChange={(value) => dispatch(createOnYearChangedAction({ value }))}
        ></NumberSpinner>
        <Button
          label="Save"
          onPress={() =>
            dispatch(createSelectDateAction({ date: state.proposedDate }))
          }
        ></Button>
        <Button
          label="Cancel"
          onPress={() => dispatch(createHidePickerAction())}
        ></Button>
      </Spread>
      <Calendar
        date={state.proposedDate}
        dispatch={dispatch}
        onDayPressed={({ date }) => dispatch(createSelectDateAction({ date }))}
      />
    </Stack>
  </Box>
);

export type TriggerProps = any;

interface DatePickerReadDisplayProps {
  dispatch: DispatchAction;
  locale?: string;
  formatDateOptions: FormatDateOptions;
  id?: string;
  label: string;
  state: State;
  triggerProps: TriggerProps;
}

export default function DatePickerReadDisplay(
  props: DatePickerReadDisplayProps
) {
  const { dispatch, id, state, triggerProps } = props;

  const displayValue = state.selectedDate
    ? state.selectedDate.toDateString()
    : "";

  return (
    <div id={id} {...triggerProps}>
      <Inline>
        <Text content={displayValue}></Text>
        <Button
          label="Edit"
          onPress={() => dispatch(createShowPickerAction())}
        ></Button>
        <Button
          label="Delete"
          onPress={() => dispatch(createClearDateAction())}
        ></Button>
      </Inline>
    </div>
  );
}

export const DatePicker = (props: DatePickerProps) => {
  const {
    id,
    value,
    earliestAllowedDate,
    latestAllowedDate,
    onChange,
    label = "date picker",
  } = props;
  const proposedDate = value || new Date(); // Default to today when there is no value provided

  const dayInputFieldValue = proposedDate.getDate();
  const monthInputFieldValue = proposedDate.getMonth() + 1; // Need to add 1 to move from 0 indexed months
  const yearInputFieldValue = proposedDate.getFullYear();

  const initialState: State = {
    isValid: true,
    pickerIsVisible: false,
    selectedDate: value, // This could legitimately be undefined when no date is set
    proposedDate,
    dayInputFieldValue,
    monthInputFieldValue,
    yearInputFieldValue,
    earliestAllowedDate,
    latestAllowedDate,
    onChange,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  // UseRef stuff was here (see previous implementation)

  /* The following section is very much a work in progress experimenting with good messages for accessibility, this
     needs to be refactored into more suitable functions for clarity / code cleanliness */
  const locale = undefined;
  const ariaDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <DatePickerContext.Provider value={context}>
      <Popup
        isOpen={state.pickerIsVisible}
        onClose={() => dispatch(createHidePickerAction())}
        placement="bottom-start"
        content={({ setInitialFocusRef }) => (
          <DatePickerEditDisplay
            id={id}
            label={label}
            dispatch={dispatch}
            setInitialFocusRef={setInitialFocusRef}
            state={state}
            locale={locale}
            formatDateOptions={ariaDateOptions}
          ></DatePickerEditDisplay>
        )}
        trigger={(triggerProps) => (
          <DatePickerReadDisplay
            id={id}
            label={label}
            dispatch={dispatch}
            state={state}
            locale={locale}
            formatDateOptions={ariaDateOptions}
            triggerProps={triggerProps}
          ></DatePickerReadDisplay>
        )}
      />
    </DatePickerContext.Provider>
  );
};
