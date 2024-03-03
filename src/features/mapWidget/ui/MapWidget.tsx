import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ReactElement } from "react";
import { useGetMarkersQuery } from "../api/markersApi";
import { MapMarker } from "@/entities/mapMarker/mapMarker";

const mapId = import.meta.env.VITE_APP_GOOGLE_MAP_ID as string;
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string;

export function MapWidget(): ReactElement {
  const position = { lat: 53.9, lng: 27.56667 };
  const { data: markers = {features: []}, isLoading, isError } = useGetMarkersQuery();

  isError && console.log('Ошибка при получении mapMarkers');
  console.log(mapId, apiKey, 'Google')
  return (
    <APIProvider apiKey={apiKey}>
      <Map zoom={13} center={position} mapId={mapId} disableDefaultUI={true} className="w-full h-[365px] mt-[50px] rounded-[12px]">
        {
          !isLoading && markers.features.map((marker, index) => <MapMarker key={index} position={{lng: marker.geometry.coordinates[0], lat: marker.geometry.coordinates[1]}} />)
        }
      </Map>
    </APIProvider>
  )
}
