import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { ReactElement } from "react";

interface IPosition {
  lng: number;
  lat: number;
}

interface IMapMarkerProps {
  position: IPosition;
}

export function MapMarker({ position }: IMapMarkerProps): ReactElement {
  return (
    <AdvancedMarker position={position}></AdvancedMarker>
  )
}
