import { ReactElement } from "react";
import { IEvent } from "../model/types";

export interface IEventCard {
  event: IEvent;
}

export function EventCard({ event }: IEventCard): ReactElement {
  const eventDate = new Date(event.start_date).toLocaleString('default', {
    month: 'long',
    day: 'numeric'
  });

  const eventTime = `${new Date(event.start_date).getHours()}:${new Date(event.start_date).getMinutes() ? new Date(event.start_date).getMinutes() : "00"}`;

  return (
    <div className="event-card flex flex-col max-w-[270px] mr-[45px]">
      <div className="flex justify-between">
        <p className="text-[14px] font-medium capitalize">{event.category?.name}</p>
        <div className="w-[24px] h-[24px] bg-heart-icon cursor-pointer"></div>
      </div>
      <figure className="flex flex-col cursor-pointer rounded-12 max-h-[188px] mt-[7px]">
        <img className="rounded-t-12 h-[143px] object-cover" src={`https://storage.googleapis.com/meetups-dev/media/${event.image_url}`} alt={`Изображение ивента ${event.name}`} />
        <div className={`h-[45px] bg-gray rounded-b-12 flex items-center justify-center pl-[16px] pr-[7px] relative ${event.name.length > 20 && "before:w-[60px] before:rounded-b-[12px] before:absolute before:right-0 before:h-full before:bg-text-fade-out"}`}>
          <figcaption className="capitalize text-[20px] font-bold text-text-black overflow-hidden whitespace-nowrap text-clip">{event.name}</figcaption>
        </div>
      </figure>
      <div className="flex justify-between mt-[10px]">
        <div className="flex flex-col">
          <p className="text-[18px] font-semibold">{eventDate}</p>
          <p className="text-[18px] font-semibold mt-[2px]">{eventTime}</p>
        </div>
        <div className="flex flex-col mt-[4px]">
          <p className="text-[14px] font-medium">5 км от вас</p>
            {
              event.rating && (
                <div className="flex items-center mt-[8px]">
                  <p className="text-[14px] font-medium">{event.rating}</p>
                  <div className="bg-rating-star w-[16px] h-[16px]"></div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}
