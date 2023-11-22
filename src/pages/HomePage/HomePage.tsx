import React, { FC, useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    Marker,
} from '@vis.gl/react-google-maps';
import axios from 'axios';

const apiKey: string = (process.env.REACT_APP_GOOGLE_MAP_API_KEY as string) 
const mapId: string = (process.env.REACT_APP_GOOGLE_MAP_ID as string)


interface Markers {
    type: string
}

const HomePage: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        axios.get('https://meetups-dev-6vuzexfx2q-lm.a.run.app/api/v1/markers/')
        .then((response) => {
            const markers = response.data.features;
            setEvents(markers)
            })
        .catch((error) => {
            console.error(error);
            })
    }, [])

    console.log(events)

return (
    <APIProvider apiKey={apiKey}>
        <div style={{height: '100vh'}}>
            <Map zoom={12} center={position} mapId={mapId}>
                {/* {events.map(event => 
                    <AdvancedMarker position={position}>
                        <Pin borderColor={'brown'}/>
                    </AdvancedMarker> 
                )}
                 */}
            </Map>
        </div>
    </APIProvider>
    );
}

export default HomePage;