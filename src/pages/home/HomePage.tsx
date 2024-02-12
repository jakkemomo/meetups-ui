import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { DateSlider } from '@/features/calendarFilter';
import { MapWidget } from '@/features/mapWidget';
import { HomePageTitle } from '@/features/townFilter';
import { useAppSelector } from '@/shared/model';
import { EventsList } from '@/widgets/EventsList';
import { Header } from '@/widgets/Header';
import { FC } from 'react';

const HomePage: FC = () => {
  const filter = useAppSelector(state => state.globalFilter.filter);
  const { data: events = {results: []}, isLoading } = useGetEventsQuery(filter);

  return (
    <main className="w-full">
      <Header />
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isLoading} data={events.results} extraClasses="mt-14" />
      <MapWidget />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
    </main>
  );
}

export default HomePage;
