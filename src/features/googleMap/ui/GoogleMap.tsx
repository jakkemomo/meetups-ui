import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ReactElement } from "react";
import { MapMarker } from "@/entities/mapMarker/mapMarker";
import { ICoordinates } from "../model/types";
import { IFeatures } from "@/widgets/mapWidget/model/types";
import { Preloader } from "@/shared/ui/Preloader";
import { MapHandler } from "./MapHandler";
import { CustomMapControl } from "./CustomMapControl";

const mapId = import.meta.env.VITE_APP_GOOGLE_MAP_ID as string;
const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY as string;

interface IGoogleMapProps {
  position: ICoordinates;
  markersArr: IFeatures[];
  isLoading?: boolean;
  zoom: number;
  extraClasses?: string;
}

export function GoogleMap({ position, markersArr, isLoading, zoom, extraClasses }: IGoogleMapProps): ReactElement {
  const markers = markersArr.map((marker, index) => <MapMarker key={index} position={{lng: marker.geometry.coordinates[0], lat: marker.geometry.coordinates[1]}} />);

  return (
    <>
      {
        isLoading ? (
          <Preloader />
        ) : (
          <APIProvider apiKey={apiKey}>
            <Map zoom={zoom} center={position} id='map' mapId={mapId} disableDefaultUI={true} className={`w-full h-[365px] rounded-[12px] ${extraClasses}`}>
              <CustomMapControl />
              <MapHandler />
              {markers}
            </Map>
          </APIProvider>
        )
      }
    </>
  )
}
