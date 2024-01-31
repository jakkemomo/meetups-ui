import { InputWithFilter } from "@/features/InputWithFilter";
import Logo from "./Logo";
import { ReactElement } from "react";
import { MapMarker } from "@/features/MapMarker";

export function Header(): ReactElement {
  return (
    <header className="w-full flex items-center">
      <Logo />
      <InputWithFilter />
      <MapMarker />
      <div className="bg-burger-menu-icon w-7 h-[25px] bg-cover bg-no-repeat bg-center ml-[77px]"></div>
    </header>
  );
}
