import {FC} from 'react';
import MapComponent from '../component/Map';
import EventsSection from "../component/Events/EventsSection";
// import Calendar from '../component/Calendar';

const HomePage: FC = () => {
    return (
        <div className={"h-screen w-screen"}>
          {/* <Calendar/> */}
          <MapComponent />
          <EventsSection />
        </div >
    );
}

export default HomePage;
