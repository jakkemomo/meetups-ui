import {ReactElement, useMemo} from "react";
import {IEvent} from "../api/mocks/types.ts";
import EventCard from "./EventCard.tsx";


interface IEventListProps {
  events: IEvent[]
}

function EventList({ events }: IEventListProps): ReactElement {
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
