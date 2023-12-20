import { ReactElement } from "react";
import {TEvent} from "../../utils/types";
import EventCard from "./EventCard";


type TEventListProps = {
  events: TEvent[]
}

function EventList({ events }: TEventListProps): ReactElement {

  return (
    <div className='flex flex-col gap-6'>
      {events.map(event => <EventCard event={event} key={event.id}/>)}
    </div>
  )
}

export default EventList;
