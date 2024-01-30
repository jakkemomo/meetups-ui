import { DateSlider } from '@/widgets/DateSlider';
import { HomePageTitle } from '@/widgets/HomePageTitle';
import {FC} from 'react';

const HomePage: FC = () => {
  return (
    <main className={"w-full"}>
      <HomePageTitle />
      <DateSlider />
    </main>
  );
}

export default HomePage;
