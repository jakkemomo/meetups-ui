import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { DateSlider } from '@/features/calendarFilter';
import { HomePageTitle } from '@/features/townFilter';
import { EventsList } from '@/widgets/EventsList';
import { FC } from 'react';

const HomePage: FC = () => {
  const { data: events = {results: []}, isLoading } = useGetEventsQuery();

  return (
    <main className="w-full">
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isLoading} data={events.results} />
    </main>
  );
}

export default HomePage;
