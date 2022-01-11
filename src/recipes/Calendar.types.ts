export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DayData = {
  dayOfMonth: number;
  isInCurrentMonth: boolean;
  available: boolean;
  selected: boolean;
  today: boolean;
  date: Date;
};

export type WeekData = {
  1: DayData;
  2: DayData;
  3: DayData;
  4: DayData;
  5: DayData;
  6: DayData;
  7: DayData;
} | {};

export type GetWeekData = (args: {
  date: Date;
  firstDateInMonth: Date;
  lastDateInMonth: Date;
  selectedDate: Date;
  today: Date;
  earliestAllowedDate?: Date;
  latestAllowedDate?: Date;
}) => WeekData;

export type GetMonthData = (args: {
  date: Date;
  today: Date;
  earliestAllowedDate?: Date;
  latestAllowedDate?: Date;
}) => WeekData[];

export type GetFirstDateOfWeek = (args: { date: Date }) => Date;

export type GetFirstDateInMonth = (args: { date: Date }) => Date;
export type GetLastDateInMonth = (args: { date: Date }) => Date;
export type GetNextDay = (args: { date: Date }) => Date;

export type DatesAreEqual = (args: { date1: Date; date2: Date }) => boolean;
export type DateIsBeforeFirstDateInMonth = (args: {
  currentDate: Date;
  firstDateInMonth: Date;
}) => boolean;

export type DateIsAfterLastDateInMonth = (args: {
  currentDate: Date;
  lastDateInMonth: Date;
}) => boolean;

export type DateIsAvailable = (args: {
  date: Date;
  earliestAllowedDate?: Date;
  latestAllowedDate?: Date;
}) => boolean;

export type CreateDayData = (args: {
  currentDate: Date;
  firstDateInMonth: Date;
  lastDateInMonth: Date;
  selectedDate: Date;
  today: Date;
  earliestAllowedDate?: Date;
  latestAllowedDate?: Date;
}) => DayData;

export interface CalendarProps {
  date: Date;
}

export interface DayProps {
  day: DayData;
}

export type WeekProps = {
  days: WeekData;
};