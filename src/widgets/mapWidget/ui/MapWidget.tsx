import { GoogleMap } from "@/features/googleMap";
import { ReactElement } from "react";
import { IFeatures } from "../model/types";
import { ICoordinates } from "@/features/googleMap/model/types";
import { AddressControl } from "./AddressControl";

interface IMapWidgetProps {
  text?: string;
  position: ICoordinates;
  zoom: number;
  markers: IFeatures[];
  isLoading?: boolean;
  withAddressControl?: boolean;
}

export function MapWidget({ text, position, zoom, markers, isLoading, withAddressControl }: IMapWidgetProps): ReactElement {
  return (
    <>
      {withAddressControl && <AddressControl />}
      {text && <p className="text-[20px] font-normal leading-[25.1px] mb-[7px] mt-[15px]">{text}</p>}
      <GoogleMap position={position} markersArr={markers} isLoading={isLoading} zoom={zoom} withAddressControl={withAddressControl} />
    </>
  )
}
