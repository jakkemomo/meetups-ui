import React, { FC } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';


const apiKey: string = (process.env.REACT_APP_GOOGLE_MAP_API_KEY as string) 


const BackgroundMap: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };

return (
    <APIProvider apiKey={apiKey}>
        <div style={{height: '100vh'}}>
            <Map zoom={12} center={position}></Map>
        </div>
    </APIProvider>
    );
}

export default BackgroundMap;