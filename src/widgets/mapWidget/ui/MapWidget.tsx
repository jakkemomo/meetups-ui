import { GoogleMap } from "@/features/googleMap";
import { ReactElement } from "react";
import { IFeatures } from "../model/types";
import { ICoordinates } from "@/features/googleMap/model/types";
import { AddressControl } from "@/features/addressControl";
import { IOnSelectAddressArgs } from "@/entities/event/model/types";

interface IMapWidgetProps {
  text?: string;
  setValuesFunc?: (arg: IOnSelectAddressArgs) => void;
  position: ICoordinates;
  zoom: number;
  markers?: IFeatures[];
  isLoading?: boolean;
  withAddressControl?: boolean;
  onMapClick?: ({ latitude, longitude }: { latitude: number, longitude: number }) => void;
}

export function MapWidget({
  text,
  setValuesFunc,
  position,
  zoom,
  markers = [],
  isLoading,
  withAddressControl,
  onMapClick
}: IMapWidgetProps): ReactElement {
  return (
    <>
      {withAddressControl && <AddressControl setValuesFunc={setValuesFunc} />}
      {text && <p className="text-[20px] font-normal leading-[25.1px] mb-[7px] mt-[15px]">{text}</p>}
      <GoogleMap
        position={position}
        markersArr={markers}
        isLoading={isLoading}
        zoom={zoom}
        withAddressControl={withAddressControl}
        extraClasses="rounded-[12px]"
        onMapClick={onMapClick}
      />
    </>
  )
}
