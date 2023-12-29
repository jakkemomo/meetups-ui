import {FC} from 'react';
import MapComponent from '../component/Map';
import EventsSection from "../component/Events/EventsSection";
import Header from '../component/Header/Header';
// import Calendar from '../component/Calendar';

const HomePage: FC = () => {
    return (
        <div className={"h-screen w-screen"}>
           {/*<Calendar/>*/}
          <Header/>
          <MapComponent />
          <EventsSection />
        </div >
    );
}

export default HomePage;
