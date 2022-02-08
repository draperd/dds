import { CreateDayData, DateIsAfterLastDateInMonth, DateIsAvailable, DateIsBeforeFirstDateInMonth, DatesAreEqual, DayData, DayOfWeek, GetFirstDateInMonth, GetFirstDateOfWeek, GetLastDateInMonth, GetMonthData, GetNextDay, GetWeekData, WeekData } from "./types";

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