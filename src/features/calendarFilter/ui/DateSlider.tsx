import { CalendarCard } from "@/shared/ui/CalendarCard";
import { SlickSlider } from "@/shared/ui/SlickSlider/SlickSlider";
import { generateCalendarDays } from "../lib/generateCalendarDays";
import { ICardProps } from "@/shared/types";

export function DateSlider() {
  const dateArr = generateCalendarDays(40);
  const cards = dateArr.map((el: ICardProps, index: number) => <CalendarCard key={index} date={el.date} weekDay={el.weekDay} />);

  const settings = {
    slidesToShow: 20,
    slidesToScroll: 5,
    speed: 500,
  }

  return (
    <SlickSlider extraSettings={settings}>
      {cards}
    </SlickSlider>
  );
}
