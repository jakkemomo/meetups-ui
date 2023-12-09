import { FC } from 'react';
import MapComponent from '../../component/Map';
import Calendar from '../../component/Calendar';

const HomePage: FC = () => {
    return (
        <div className={"h-screen"}>
            <Calendar/>
            < MapComponent />
        </div >
    );
}

export default HomePage;