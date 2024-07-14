import { EventCard } from "@/entities/event";
import { IEvent } from "@/entities/event/model/types";

export const getEventsCards = (cards: IEvent[], size: 'sm' | 'lg') => {
  const eventsList = cards.map((event) => <EventCard key={event.id} size={size} event={event} />)

  return eventsList;
}
