import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ReactElement } from "react";

const mapId = import.meta.env.VITE_APP_GOOGLE_MAP_ID as string;
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string;

export function MapWidget(): ReactElement {
  const position = { lat: 53.9, lng: 27.56667 };

  return (
    <APIProvider apiKey={apiKey}>
      <Map zoom={13} center={position} mapId={mapId} disableDefaultUI={true} className="w-full h-[365px] mt-[50px] rounded-[12px]">

      </Map>
    </APIProvider>
  )
}
