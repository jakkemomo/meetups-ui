import { DateSlider } from '@/features/calendarFilter';
import { HomePageTitle } from '@/features/townFilter';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <main className={"w-full"}>
      <HomePageTitle />
      <DateSlider />
    </main>
  );
}

export default HomePage;
