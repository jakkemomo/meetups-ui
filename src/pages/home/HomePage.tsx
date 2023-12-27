import {FC} from 'react';
import MapComponent from '../../features/events-map/Map';
import Header from '../../app/header/Header';
// @ts-ignore
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
    return (
        <div className={styles.homeScreen}>
            <Header/>
            <MapComponent/>
        </div>
    );
}

export default HomePage;
