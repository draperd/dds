import React from "react";

import { token } from "@atlaskit/tokens";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "../../../html/Table";
import { CalendarProps, DayProps, WeekProps } from "./types";

import { Button } from "../../Button";
import { Inline } from "../../../primitives/Inline";
import { Stack } from "../../../primitives/Stack";
import { Text } from "../../../primitives/Text";
import { Pressable } from "../../../behaviors/Pressable";
import { getMonthData } from "../utils";

export const Day = ({ day, onDayPressed }: DayProps) => {
  const { dayOfMonth, date, selected, isInCurrentMonth } = day;
  let color = isInCurrentMonth
    ? `${token("color.text")}`
    : `${token("color.text.subtlest")}`;
  color = !selected ? color : `${token("color.text.selected")}`;
  const backgroundColor = selected
    ? `${token("color.background.selected")}`
    : undefined;

  return (
    <TableDataCell spacingStyle="SQUISHED-INSET">
      <Pressable
        spacingSize="SMALL"
        onPress={() => onDayPressed({ date })}
        spacingStyle="SQUISHED-INSET"
        spacingAlignment="CENTER"
        radiusSize="SMALL"
        backgroundColor={backgroundColor}
      >
        <Text content={dayOfMonth.toString()} color={color}></Text>
      </Pressable>
    </TableDataCell>
  );
};

export const Week = ({ days, onDayPressed }: WeekProps) => {
  return (
    <TableRow>
      <Day day={days[0]} onDayPressed={onDayPressed} />
      <Day day={days[1]} onDayPressed={onDayPressed} />
      <Day day={days[2]} onDayPressed={onDayPressed} />
      <Day day={days[3]} onDayPressed={onDayPressed} />
      <Day day={days[4]} onDayPressed={onDayPressed} />
      <Day day={days[5]} onDayPressed={onDayPressed} />
      <Day day={days[6]} onDayPressed={onDayPressed} />
    </TableRow>
  );
};

type DayOfWeekHeaderCellProps = {
  content: string;
};

export const DayOfWeekHeaderCell = (props: DayOfWeekHeaderCellProps) => (
  <TableHeadCell spacingAlignment="CENTER">
    <Text
      typographyWeight="BOLD"
      content={props.content}
      color={`${token("color.text.subtlest")}`}
    />
  </TableHeadCell>
);

export const Calendar = ({
  date,
  onDayPressed,
  onMonthChanged,
  onYearChanged,
}: CalendarProps) => {
  const today = new Date();
  const weeksInMonth = getMonthData({
    date,
    today,
  });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} onDayPressed={onDayPressed} />
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
          onPress={() => onYearChanged({ year: previousYear.toString() })}
        ></Button>
        <Button
          label="<"
          onPress={() => onMonthChanged({ month: previousMonth.toString() })}
        ></Button>
        <Text content={`${month} ${year}`} typographyStyle="HEADING"></Text>
        <Button
          label=">"
          onPress={() => onMonthChanged({ month: nextMonth.toString() })}
        ></Button>
        <Button
          label=">>"
          onPress={() => onYearChanged({ year: nextYear.toString() })}
        ></Button>
      </Inline>
      <Inline spacingAlignment="CENTER">
        <Table>
          <TableHead>
            <TableRow>
              <DayOfWeekHeaderCell content="SUN"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="MON"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="TUE"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="WED"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="THU"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="FRI"></DayOfWeekHeaderCell>
              <DayOfWeekHeaderCell content="SAT"></DayOfWeekHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>{weeks}</TableBody>
        </Table>
      </Inline>
    </Stack>
  );
};
