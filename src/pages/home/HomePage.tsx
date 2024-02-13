import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { DateSlider } from '@/features/calendarFilter';
import { MapWidget } from '@/features/mapWidget';
import { HomePageTitle } from '@/features/townFilter';
import { useAppSelector } from '@/shared/model';
import { EventsList } from '@/widgets/EventsList';
import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  const filter = useAppSelector(state => state.globalFilter.filter);
  const { data: events = {results: []}, isLoading, isError } = useGetEventsQuery(filter && filter);

  isError && console.log('Ошибка при получении ивентов');

  return (
    <main className="w-full">
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isLoading} data={events.results} extraClasses="mt-14" />
      <MapWidget />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
    </main>
  );
}
