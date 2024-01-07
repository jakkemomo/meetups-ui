import {FC} from 'react';
import MapComponent from '../component/Map';
import EventsSection from "../component/Events/EventsSection";
import Header from '../widgets/header/Header';

const HomePage: FC = () => {
    return (
        <div className={"h-screen w-screen"}>
          <Header/>
          <MapComponent />
          <EventsSection />
        </div >
    );
}

export default HomePage;
