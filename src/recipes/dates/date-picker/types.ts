import { DispatchAction, FormatDateOptions, OnChange, SetInitialFocusRef, State } from "../types";

export interface DatePickerProps {
    id?: string;
    value?: Date;
    isDisabled?: boolean; // TODO: This needs handling
    earliestAllowedDate?: Date;
    latestAllowedDate?: Date;
    onChange?: OnChange;
    label?: string;
  }
  
  export interface DatePickerEditDisplayProps {
    dispatch: DispatchAction;
    state: State;
    label: string;
    locale?: string;
    formatDateOptions: FormatDateOptions;
    id?: string;
    setInitialFocusRef: SetInitialFocusRef;
  }


export type TriggerProps = any;

export interface DatePickerReadDisplayProps {
  dispatch: DispatchAction;
  locale?: string;
  formatDateOptions: FormatDateOptions;
  id?: string;
  label: string;
  state: State;
  triggerProps: TriggerProps;
}