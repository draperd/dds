import React from "react";

import { Calendar } from "./Calendar";

interface DatePickerProps {
  content: string;
}

export const DatePicker = ({ content }: DatePickerProps) => (
  <Calendar date={new Date()} />
);
