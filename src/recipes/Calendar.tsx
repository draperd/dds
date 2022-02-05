import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "../html/Table";
import {
  CalendarProps,
  CreateDayData,
  DateIsAfterLastDateInMonth,
  DateIsAvailable,
  DateIsBeforeFirstDateInMonth,
  DatesAreEqual,
  DayData,
  DayOfWeek,
  DayProps,
  GetFirstDateInMonth,
  GetFirstDateOfWeek,
  GetLastDateInMonth,
  GetMonthData,
  GetNextDay,
  GetWeekData,
  WeekData,
  WeekProps,
} from "./Calendar.types";

import { Button } from "./Button";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import {
  createOnMonthChangedAction,
  createOnYearChangedAction,
} from "./DatePickerActions";

export const oneDayInMilliseconds = 60 * 60 * 24 * 1000;

export const getFirstDateOfWeek: GetFirstDateOfWeek = ({ date }) => {
  const dayOfDate = date.getDay();
  return new Date(date.getTime() - dayOfDate * oneDayInMilliseconds);
};

export const dateIsBeforeFirstDateInMonth: DateIsBeforeFirstDateInMonth = ({
  currentDate,
  firstDateInMonth,
}) => {
  return currentDate < firstDateInMonth;
};

export const dateIsAfterLastDateInMonth: DateIsAfterLastDateInMonth = ({
  currentDate,
  lastDateInMonth,
}) => {
  return currentDate > lastDateInMonth;
};

export const datesAreEqual: DatesAreEqual = ({ date1, date2 }) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const dateIsAvailable: DateIsAvailable = ({
  date,
  earliestAllowedDate,
  latestAllowedDate,
}) => {
  if (earliestAllowedDate && earliestAllowedDate > date) {
    return false;
  }
  if (latestAllowedDate && latestAllowedDate < date) {
    return false;
  }
  return true;
};

export const createDayData: CreateDayData = ({
  currentDate,
  firstDateInMonth,
  lastDateInMonth,
  selectedDate,
  today,
  earliestAllowedDate,
  latestAllowedDate,
}) => {
  const currentDateOutsideMonth =
    dateIsBeforeFirstDateInMonth({ currentDate, firstDateInMonth }) ||
    dateIsAfterLastDateInMonth({ currentDate, lastDateInMonth });

  const dayData: DayData = {
    dayOfMonth: currentDate.getDate(),
    isInCurrentMonth: !currentDateOutsideMonth,
    available: dateIsAvailable({
      date: currentDate,
      earliestAllowedDate,
      latestAllowedDate,
    }),
    selected: datesAreEqual({ date1: currentDate, date2: selectedDate }),
    today: datesAreEqual({ date1: currentDate, date2: today }),
    date: currentDate,
  };

  return dayData;
};

export const getWeekData: GetWeekData = ({
  date,
  firstDateInMonth,
  lastDateInMonth,
  selectedDate,
  today,
  earliestAllowedDate,
  latestAllowedDate,
}) => {
  const firstDateInWeek = getFirstDateOfWeek({ date });

  const week: WeekData = {};

  let currentDate = firstDateInWeek;
  for (let i = 0; i < 7; i++) {
    const dayData = createDayData({
      currentDate,
      firstDateInMonth,
      lastDateInMonth,
      selectedDate,
      today,
      earliestAllowedDate,
      latestAllowedDate,
    });

    const day: DayOfWeek = dayData.date.getDay() as DayOfWeek;
    week[day] = dayData;
    currentDate = getNextDay({ date: currentDate });
  }

  return week;
};

export const getNextDay: GetNextDay = ({ date }) => {
  const clonedDate = new Date(date.getTime());
  clonedDate.setDate(date.getDate() + 1);
  return clonedDate;
};

export const getFirstDateInMonth: GetFirstDateInMonth = ({ date }) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDateInMonth: GetLastDateInMonth = ({ date }) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getMonthData: GetMonthData = ({
  date,
  today,
  earliestAllowedDate,
  latestAllowedDate,
}) => {
  const firstDateInMonth = getFirstDateInMonth({ date });
  const lastDateInMonth = getLastDateInMonth({ date });

  const weeksInMonth: WeekData[] = [];

  let nextDate = firstDateInMonth;
  do {
    let currentWeek = getWeekData({
      date: nextDate,
      firstDateInMonth,
      lastDateInMonth,
      selectedDate: date,
      today,
      earliestAllowedDate,
      latestAllowedDate,
    });
    weeksInMonth.push(currentWeek);

    let lastDateOfCurrentWeek = currentWeek[6].date;
    nextDate = getNextDay({ date: lastDateOfCurrentWeek });
  } while (nextDate < lastDateInMonth);

  return weeksInMonth;
};

export const Day = ({ day }: DayProps) => {
  const { dayOfMonth } = day;
  return (
    <TableDataCell>
      <Text content={dayOfMonth.toString()}></Text>
    </TableDataCell>
  );
};

export const Week = ({ days }: WeekProps) => {
  return (
    <TableRow>
      <Day day={days[0]} />
      <Day day={days[1]} />
      <Day day={days[2]} />
      <Day day={days[3]} />
      <Day day={days[4]} />
      <Day day={days[5]} />
      <Day day={days[6]} />
    </TableRow>
  );
};

export const Calendar = ({ date, dispatch }: CalendarProps) => {
  const today = new Date();
  const weeksInMonth = getMonthData({
    date,
    today,
  });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} />
  ));

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // NOTE: Months are zero-indexed, but the month field is not hence adding 2 and not substracting anything!
  const nextMonth = date.getMonth() + 2;
  const previousMonth = date.getMonth();
  const nextYear = date.getFullYear() + 1;
  const previousYear = date.getFullYear() - 1;

  return (
    <Stack spacingAlignment="CENTER">
      <Inline spacingAlignment="CENTER">
        <Button
          label="<<"
          onPress={() =>
            dispatch(createOnYearChangedAction({ value: previousYear }))
          }
        ></Button>
        <Button
          label="<"
          onPress={() =>
            dispatch(createOnMonthChangedAction({ value: previousMonth }))
          }
        ></Button>
        <Text content={`${month} ${year}`} typographyStyle="HEADING"></Text>
        <Button
          label=">"
          onPress={() =>
            dispatch(createOnMonthChangedAction({ value: nextMonth }))
          }
        ></Button>
        <Button
          label=">>"
          onPress={() =>
            dispatch(createOnYearChangedAction({ value: nextYear }))
          }
        ></Button>
      </Inline>
      <Inline spacingAlignment="CENTER">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                <Text content="SUN" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="MON" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="TUE" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="WED" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="THU" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="FRI" />
              </TableHeadCell>
              <TableHeadCell>
                <Text content="SAT" />
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>{weeks}</TableBody>
        </Table>
      </Inline>
    </Stack>
  );
};
