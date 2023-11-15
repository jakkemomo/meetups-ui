import React, { FC } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

const BackgroundMap: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };

return (
    <APIProvider apiKey='AIzaSyB1-1DC0D7WgsFMvTslrDNRmAI58irxToY'>
        <div style={{height: '100vh'}}>
            <Map zoom={12} center={position}></Map>
        </div>
    </APIProvider>
    );
}

export default BackgroundMap;