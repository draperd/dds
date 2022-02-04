import React from "react";
import { Spread } from "../primitives/Spread";
import { Stack } from "../primitives/Stack";
import { Button } from "./Button";

import { Calendar } from "./Calendar";
import { NumberSpinner } from "./NumberSpinner";

import "./datepicker.css";

interface DatePickerProps {
  content: string;
}

export const DatePicker = ({ content }: DatePickerProps) => (
  <Stack className="datepicker-popup">
    <Spread>
      <NumberSpinner id="DAY" label="Day"></NumberSpinner>
      <NumberSpinner id="MONTH" label="Month"></NumberSpinner>
      <NumberSpinner id="YEAR" label="Year"></NumberSpinner>
      <Button label="Save"></Button>
      <Button label="Cancel"></Button>
    </Spread>
    <Calendar date={new Date()} />
  </Stack>
);
