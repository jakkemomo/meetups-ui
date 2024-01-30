import { ReactElement } from "react";

export function MapMarker(): ReactElement {
  return (
    <div className="flex items-center ml-[200px]">
      <div className="bg-map-marker-icon w-5 h-[26px] bg-cover bg-no-repeat bg-center"></div>
      <p className="text-text-gray text-18 font-medium leading-normal ml-2.5">Минск</p>
    </div>
  );
}