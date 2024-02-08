import { CalendarCard } from "@/shared/ui/CalendarCard";
import { SlickSlider } from "@/shared/ui/SlickSlider/SlickSlider";
import { ICardProps } from "@/shared/types";
import { generateCalendarDays } from "../lib/generateCalendarDays";
import { currentMonth, settings } from "../model/constants";

export function DateSlider() {
  const dateArr = generateCalendarDays(40);
  const cards = dateArr.map((el: ICardProps, index: number) => <CalendarCard key={index} date={el.date} weekDay={el.weekDay} />);

  return (
    <div className="flex flex-col relative before:w-[165px] before:absolute before:right-[-5px] before:h-full before:bg-slider-fade-out before:z-10 mt-[46px]">
      <h3 className="capitalize text-[20px] font-normal text-text-black">{currentMonth}</h3>
      <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-0 top-1/2 translate-y-[-50%]', leftArrow: 'left-[-30px]'}}>
        {cards}
      </SlickSlider>
    </div>
  );
}
