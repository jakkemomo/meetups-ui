import { FC, useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';
import { useGetMapQuery } from '../../shared/api/map/mapApi';
import {GOOGLE_MAP_API_KEY, GOOGLE_MAP_ID} from '../../shared/config'
// @ts-ignore
import styles from './Map.module.scss';

const MapComponent: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };
    const [events, setEvents] = useState([]);
    const { data, isSuccess } = useGetMapQuery('');
    const [open, setOpen] = useState<number | null | boolean>(null);

    useEffect(() => {
        if (isSuccess)
            setEvents(data.features)
    }, [data, isSuccess]);

    const eventsArr = events.map(arr =>
        arr['geometry']['coordinates']).map(([lng, lat]) =>
            ({ lng, lat }));

    return (
        <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Map zoom={12} center={position} mapId={GOOGLE_MAP_ID} className={styles.map}>
                {eventsArr.map((event, index) => (
                    <AdvancedMarker
                        position={event}
                        key={index}
                        onClick={() => setOpen((prevIndex) => (prevIndex === index ? null : index))}
                    >
                        {open === index && (
                            <InfoWindow className={styles.info_window} position={event}  onCloseClick={() => setOpen(null)}>
                                {data.features.map((el: any, i: number) =>
                                    i === index ? (
                                        <div key={i}>
                                            <p className={styles.info_window_p}>
                                                {el.properties.name}
                                            </p>
                                            <p className={styles.info_window_p}>
                                                {el.properties.address}
                                            </p>
                                            <p className={styles.info_window_p}>
                                                {new Date(el.properties.start_date).toLocaleString()}
                                            </p>
                                            <p className={styles.info_window_p}>
                                                {new Date(el.properties.end_date).toLocaleString()}
                                            </p>
                                            <button className={styles.info_window_button}>join</button>
                                        </div>
                                    ) : null
                                )}
                            </InfoWindow>
                        )}
                        <Pin borderColor={'brown'} />
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    );
}

export default MapComponent;