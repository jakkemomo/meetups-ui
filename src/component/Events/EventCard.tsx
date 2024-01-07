import { memo, ReactElement } from "react";
import { TEvent } from "@/entities/event/api/mocks/types";
import { getLocaleMonth } from "@/entities/event/api/mocks/constants";
import * as _ from "lodash";


type TEventCardProps = {
  event: TEvent
}

function EventCard({ event }: TEventCardProps): ReactElement {

  const startDate = new Date(event.start_date);
  const month = String(getLocaleMonth(startDate.getMonth(), 'ru-ru'));
  const day = String(startDate.getDate()).padStart(2, '0');

  return (
    <div className='flex justify-between items-center text-neutral-900 bg-neutral-50 h-28 w-610 py-3.5 pl-3.5 pr-7 gap-6 rounded-xl'>
      <img className='h-20 w-20 object-cover object-center' src={event.image_url} alt='Фото мероприятия'/>
      <div className='flex flex-col gap-1.5 w-358'>
        <p className='text-22 font-bold leading-6 line-clamp-1'>{event.name}</p>
        <p className='text-17 font-normal leading-5 line-clamp-2'>{event.description}</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-1 pl-4'>
        <p className='text-51 font-bold leading-10'>{day}</p>
        <p className='text-sm font-bold'>{month}</p>
      </div>
    </div>
  )
}

export default memo(EventCard, _.isEqual);
