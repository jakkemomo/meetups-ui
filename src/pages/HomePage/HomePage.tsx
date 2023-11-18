import React, { FC } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';


const apiKey: string = (process.env.REACT_APP_GOOGLE_MAP_API_KEY as string) 
const mapId: string = (process.env.REACT_APP_GOOGLE_MAP_ID as string)

const HomePage: FC = () => {
    const position = { lat: 53.90228, lng: 27.561831 };

return (
    <APIProvider apiKey={apiKey}>
        <div style={{height: '100vh'}}>
            <Map zoom={12} center={position} mapId={mapId}>
                <AdvancedMarker position={position}>
                    <Pin borderColor={'brown'}/>
                </AdvancedMarker>
            </Map>
        </div>
    </APIProvider>
    );
}

export default HomePage;