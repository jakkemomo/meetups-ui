import {FC} from 'react';
import MapComponent from '../component/Map';
import Header from '../component/Header/Header';

const HomePage: FC = () => {
    return (
        <div className={"h-screen"}>
            <Header/>
            <MapComponent/>
        </div>
    );
}

export default HomePage;
