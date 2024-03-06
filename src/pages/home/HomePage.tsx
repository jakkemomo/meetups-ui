import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import {DateSlider} from '@/features/calendarFilter';
import {HomePageTitle} from '@/features/townFilter';
import { useAppSelector } from '@/shared/model';
import { EventsList } from '@/widgets/EventsList';
import { MapWidget } from '@/widgets/mapWidget';
import { useGetMarkersQuery } from '@/widgets/mapWidget/api/markersApi';
import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  const { search } = useAppSelector(state => state.searchFilter);
  const { data: events = {results: []}, isLoading: isEventsLoading, isError: isEventsError, error: eventsError } = useGetEventsQuery({ search: search });
  const { data: markers = {features: []}, isLoading: isMarkersLoading, isError: isMarkersError, error: markersError } = useGetMarkersQuery();

  isMarkersError && console.log(`Ошибка при получении mapMarkers - ${JSON.stringify(markersError)}`);

  isEventsError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(eventsError)}`);

  return (
    <main className="w-full">
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isEventsLoading} data={events.results} extraClasses="mt-14 mb-[50px]" />
      <MapWidget position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markers={markers.features} isLoading={isMarkersLoading} />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isEventsLoading} data={events.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isEventsLoading} data={events.results} extraClasses="mt-[50px]" />
    </main>
  );
}
