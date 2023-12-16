import { FC } from 'react';
import MapComponent from '../../component/Map';
import Header from '../../component/Header/Header';
// import Calendar from '../../component/Calendar';

const HomePage: FC = () => {
    return (
        <div className={"h-screen"}>
            {/* <Calendar/> */}
            <Header />
            < MapComponent />
        </div >
    );
}

export default HomePage;