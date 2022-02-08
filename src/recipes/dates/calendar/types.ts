import { DayData, WeekData } from "../types";

export interface CalendarProps {
    date: Date;
    onDayPressed: OnDayPressed;
    onMonthChanged: OnMonthChanged;
    onYearChanged: OnYearChanged;
  }
  
export type OnDayPressed = (args: { date: Date}) => void;
export type OnYearChanged = (args: { year: string}) => void;
export type OnMonthChanged = (args: { month: string}) => void;

export interface DayProps {
    day: DayData;
    onDayPressed: OnDayPressed;
  }
  
  export type WeekProps = {
    days: WeekData;
    onDayPressed: OnDayPressed;
  };