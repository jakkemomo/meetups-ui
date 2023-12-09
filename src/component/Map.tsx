import { FC, useEffect, useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
} from '@vis.gl/react-google-maps';
import { useGetMapQuery } from '../store/map/mapApi';

const mapId: string = (process.env.REACT_APP_GOOGLE_MAP_ID as string)

const MapComponent: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };
    const [events, setEvents] = useState([])
    const { data, isSuccess } = useGetMapQuery('')

    useEffect(() => {
        if (isSuccess)
            setEvents(data.features)
    }, [data, isSuccess])

    const eventsArr = events.map(arr =>
        arr['geometry']['coordinates']).map(([lng, lat]) =>
            ({ lng, lat }));

    return (
        <Map zoom={12} center={position} mapId={mapId}>
            {eventsArr.map((event, index) =>
                <AdvancedMarker position={event} key={index}>
                    <Pin borderColor={'brown'} />
                </AdvancedMarker>
            )}
        </Map>
    );
}

export default MapComponent;