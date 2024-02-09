import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import {DateSlider} from '@/features/calendarFilter';
import {HomePageTitle} from '@/features/townFilter';
import { EventsList } from '@/widgets/EventsList';
import {FC} from 'react';

const HomePage: FC = () => {
  const { data: events = {results: []}, isLoading } = useGetEventsQuery();

  return (
    <main className="w-full">
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isLoading} data={events.results} extraClasses="mt-14" />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isLoading} data={events.results} extraClasses="mt-[50px]" />
    </main>
  );
}

export default HomePage;
