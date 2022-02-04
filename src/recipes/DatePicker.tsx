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
} from "./DatePickerActions";
import { reducer } from "./DatePickerReducer";
import {
  DispatchAction,
  FormatDateOptions,
  OnChange,
  SetInitialFocusRef,
  State,
} from "./DatePicker.types";

import "./datepicker.css";

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
    <Stack className="datepicker-popup">
      <Spread>
        <NumberSpinner id="DAY" label="Day"></NumberSpinner>
        <NumberSpinner id="MONTH" label="Month"></NumberSpinner>
        <NumberSpinner id="YEAR" label="Year"></NumberSpinner>
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
      <Calendar date={new Date()} />
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

export default function ReadDisplay(props: DatePickerReadDisplayProps) {
  const {
    dispatch,
    id,
    // label,
    // locale,
    // formatDateOptions,
    state,
    triggerProps,
  } = props;

  const displayValue = state.selectedDate
    ? state.selectedDate.toDateString()
    : "";

  // const ariaDate = state.selectedDate
  //   ? state.selectedDate.toLocaleDateString(locale, formatDateOptions)
  //   : "";

  // const ariaLabel =
  //   label + (ariaDate === "" ? " with no date" : ` with date ${ariaDate}`);

  // const editButtonLabel = `Edit date of ${label}`;
  // const clearButtonLabel = `Clear date for ${label}`;

  return (
    <div id={id} className="display" {...triggerProps}>
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

  // // This is an attempt to track changing in prop value, to update the selected date...
  // // However, this updates on each render and we need to be able to process more than once
  // const ref = useRef();
  // useEffect(() => {
  //   const previousProps = ref.current;
  //   if (previousProps) {
  //     if (previousProps.value !== value) {
  //       if (value) {
  //         dispatch(createSelectDateAction({ date: value }));
  //       } else {
  //         dispatch(createClearDateAction());
  //       }
  //     }

  //     const {
  //       earliestAllowedDate: previousEarliestAllowedDate,
  //       latestAllowedDate: previousLatestAllowedDate,
  //     } = previousProps;
  //     if (
  //       previousEarliestAllowedDate !== earliestAllowedDate ||
  //       previousLatestAllowedDate !== latestAllowedDate
  //     ) {
  //       dispatch(
  //         createSetConstraintsAction({
  //           earliestAllowedDate,
  //           latestAllowedDate,
  //         })
  //       );
  //     }
  //   }
  //   ref.current = props;
  // });

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
          <ReadDisplay
            id={id}
            label={label}
            dispatch={dispatch}
            state={state}
            locale={locale}
            formatDateOptions={ariaDateOptions}
            triggerProps={triggerProps}
          ></ReadDisplay>
        )}
      />
    </DatePickerContext.Provider>
  );
};
