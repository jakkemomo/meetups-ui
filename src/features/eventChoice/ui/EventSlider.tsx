import { SlickSlider } from "@/shared";
import { ReactElement, useEffect, useState } from "react";
import { IEvent } from "@/entities/event/model/types";
import { EventCard } from "@/entities/event";

interface IEventSlider {
  events: IEvent[];
}

export function EventSlider({ events }: IEventSlider): ReactElement {
  const cards = events.map((el, index) => <EventCard key={index} event={el} />);

  const [width, setWidth] = useState(103.7);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    switch (events.length) {
      case 1:
        setWidth(26);
        setSlidesToShow(1);
        break
      case 2:
        setWidth(52);
        setSlidesToShow(2);
        break
      case 3:
        setWidth(78);
        setSlidesToShow(3);
        break
      default:
        setWidth(103.7);
        setSlidesToShow(4);
    }
  }, [events.length]);

  const settings = {
    slidesToShow,
    slidesToScroll: 2,
    speed: 400,
    className: `mt-3 w-[${width}%] min-h-[285px]`
  }

  return (
    <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-[45px] top-[110px]', leftArrow: 'left-[-30px] top-[110px]'}}>
      {cards}
    </SlickSlider>
  )
}
