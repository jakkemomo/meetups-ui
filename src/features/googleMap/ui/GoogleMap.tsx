import { APIProvider, Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { ReactElement } from "react";
import { MapMarker } from "@/entities/mapMarker/mapMarker";
import { ICoordinates } from "../model/types";
import { IFeatures } from "@/widgets/mapWidget/model/types";
import { MapHandler } from "./MapHandler";
import { AddressMapControl } from "./AddressMapControl";
import ImplementMarkerMapControl from "./ImplementMarkerMapControl";
import MapSkeleton from "./MapSkeleton";
import { config } from "@/shared/config";

interface IGoogleMapProps {
  position: ICoordinates;
  markersArr: IFeatures[];
  isLoading?: boolean;
  zoom: number;
  extraClasses?: string;
  withAddressControl?: boolean;
  onMapClick?: ({ latitude, longitude }: { latitude: number, longitude: number }) => void;
}

export function GoogleMap({
  position,
  markersArr,
  isLoading,
  zoom,
  extraClasses,
  withAddressControl,
  onMapClick
}: IGoogleMapProps): ReactElement {
  const markers = markersArr.map((marker, index) => <MapMarker key={index} position={{lng: marker.geometry.coordinates[0], lat: marker.geometry.coordinates[1]}} />);
  const apiIsLoaded = useApiIsLoaded();

  return (
    <>
      {
        !apiIsLoaded || isLoading ? (
          <MapSkeleton />
        ) : (
          <APIProvider language="ru-RU" apiKey={config.GOOGLE_MAP_API_KEY}>
            <Map zoom={zoom} center={position} mapId={config.GOOGLE_MAP_ID} disableDefaultUI={true} className={`w-full h-[365px] rounded-[12px] shadow ${extraClasses}`}>
              {
                withAddressControl && (
                  <>
                    <ImplementMarkerMapControl onMapClick={onMapClick} />
                    <AddressMapControl />
                    <MapHandler />
                  </>
                )
              }
              {markers}
            </Map>
          </APIProvider>
        )
      }
    </>
  )
}
