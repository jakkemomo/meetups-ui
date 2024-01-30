import { arr } from "./constants";
import { CalendarCard } from "@/shared/ui/CalendarCard";
import { SlickSlider } from "@/shared/ui/SlickSlider/SlickSlider";

export function DateSlider() {
  const cards = arr.map((el, index) => <CalendarCard key={index} date={el.date} weekDay={el.weekDay} index={index} />);

  const settings = {
    slidesToShow: 20,
    slidesToScroll: 5,
    speed: 500,
  }

  return (
    <div>
      <SlickSlider extraSettings={settings}>
        {cards}
      </SlickSlider>
    </div>
  );
}