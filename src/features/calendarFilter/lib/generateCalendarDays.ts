import {ICardProps} from "@/shared/types";
import {formatedWeekDays} from "../model/constants";

interface IFormatedWeekDays {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
}

export function generateCalendarDays(days_quantity: number) {
  const date = (new Date());
  const dateArr: ICardProps[] = [];

  for (let i = 0; i < days_quantity; i++) {

    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
    const calendarDay = String(day.getDate());
    const summary = String(day.getFullYear())+'-'+(String(day.getMonth()).length < 2? `0${String(day.getMonth()+1)}` : (String(day.getMonth()+1))) +'-'+(String(day.getDate()).length <2? `0${String(day.getDate())}` : String(day.getDate()));
    let weekDay: string | number = day.getDay() > 0 ? day.getDay() - 1 : 6;

    Object.keys(formatedWeekDays).forEach((el) => Number(el) === weekDay ? weekDay = formatedWeekDays[el as keyof IFormatedWeekDays] : null);

    dateArr.push({date: calendarDay, weekDay: String(weekDay), summary: summary});

  }

  return dateArr;
}
