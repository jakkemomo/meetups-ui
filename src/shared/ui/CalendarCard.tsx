import { ReactElement } from "react";
import { ICardProps } from "../types";

export function CalendarCard({ date, weekDay }: ICardProps): ReactElement {
  return (
    <div className={`flex flex-col pr-7 shrink-0 max-w-[60px]`}>
      <p className="text-[22px] text-bold text-text-black text-center">{date}</p>
      <p className={`text-[13px] text-medium mt-2 text-text-black text-center uppercase ${weekDay === "СБ" || weekDay === "ВС" ? "text-text-red" : ""}`}>{weekDay}</p>
    </div>
  );
}
