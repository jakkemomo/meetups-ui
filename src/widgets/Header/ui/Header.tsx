import { InputWithFilter } from "@/features/globalFilter";
import Logo from "./Logo";
import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <header className="w-full flex items-center">
      <Logo />
      <InputWithFilter />
      <div className="bg-burger-menu-icon w-7 h-[25px] bg-cover bg-no-repeat bg-center ml-[364.4px] cursor-pointer"></div>
    </header>
  );
}
