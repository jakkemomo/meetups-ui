import { ReactElement } from "react";
import { ICardProps } from "../types";
import Svg from "./Svg";

interface ICalendarCard {
  date: ICardProps;
  isStartDate: boolean;
  isEndDate: boolean;
  isBetweenDate: boolean;
  isSelectedDate: boolean;
  onClickDate?: (date: ICardProps) => void;
  onCloseCalendarFilter: () => void;
}

export function CalendarCard({
  date,
  isStartDate,
  isEndDate,
  isBetweenDate,
  isSelectedDate,
  onClickDate,
  onCloseCalendarFilter,
}: ICalendarCard): ReactElement {
  return (
    <div className="relative flex flex-col duration-150 mt-[29px] hoverscreen:hover:opacity-70">
      {(isEndDate || isSelectedDate) && (
        <Svg
          className="absolute top-[-29px] self-center"
          id="calendar-filter-x"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          extraUseClass="cursor-pointer"
          onClick={onCloseCalendarFilter}
        />
      )}

      <div
        className={`flex flex-col shrink-0 max-w-[42px] w-full cursor-pointer ${
          isStartDate || isEndDate
            ? "bg-zinc-100 rounded-xl border border-neutral-600 w-full"
            : ""
        } ${isBetweenDate ? "bg-zinc-100 rounded-xl w-full" : ""}`}
        onClick={() => onClickDate && onClickDate(date)}
      >
        <p className="text-[22px] font-semibold text-text-black text-center">
          {date.date}
        </p>
        <p
          className={`text-[13px] font-medium mt-2 text-center uppercase ${
            date.weekDay === "СБ" || date.weekDay === "ВС"
              ? "text-system-500"
              : "text-text-black"
          }`}
        >
          {date.weekDay}
        </p>
      </div>
    </div>
  );
}
