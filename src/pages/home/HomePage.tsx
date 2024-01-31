import { DateSlider } from '@/features/DateSlider';
import { HomePageTitle } from '@/features/HomePageTitle';
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
