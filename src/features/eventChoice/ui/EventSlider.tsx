import { SlickSlider } from "@/shared";
import { ReactElement } from "react";
import { settings } from "../model/constants";
import { IEvent } from "@/entities/event/model/types";
import { EventCard } from "@/entities/event";

interface IEventSlider {
  events: IEvent[];
}

export function EventSlider({ events }: IEventSlider): ReactElement {
  const cards = events.map((el, index) => <EventCard key={index} event={el} />);

  return (
    <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-[45px] top-[110px]', leftArrow: 'left-[-30px]'}}>
      {cards}
    </SlickSlider>
  )
}