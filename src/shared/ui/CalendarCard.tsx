import {ReactElement} from "react";
import {ICardProps} from "../types";

export function CalendarCard({ date, weekDay }: ICardProps): ReactElement {
  return (
    <div className="flex flex-col mr-8 shrink-0 max-w-[27px] cursor-pointer">
      <p className="text-[22px] font-semibold text-text-black text-center">{date}</p>
      <p className={`text-[13px] font-medium mt-2 text-text-black text-center uppercase ${weekDay === "СБ" || weekDay === "ВС" ? "text-text-red" : ""}`}>{weekDay}</p>
    </div>
  );
}
