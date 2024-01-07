import {ReactElement, useMemo} from "react";
import {TEvent} from "@/entities/event/api/mocks/types";
import EventCard from "./EventCard";


type TEventListProps = {
  events: TEvent[]
}

function EventList({ events }: TEventListProps): ReactElement {
  const eventCards = useMemo(() =>
    events.map(event => <EventCard event={event} key={event.id} />)
  , [events]);
  return (
    <div className='flex flex-col gap-6'>
      {eventCards}
    </div>
  )
}

export default EventList;
