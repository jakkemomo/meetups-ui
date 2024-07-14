import { Menu } from "@headlessui/react";
import Svg from "@/shared/ui/Svg";
import { Fragment } from "react";

export interface IMenuItemProps {
  img: string;
  name: string;
  onClick: () => void;
}

export const MenuItem = ({ img, name, onClick }: IMenuItemProps) => {
  return (
    <Menu.Item as={Fragment}>
      <figure onClick={onClick} className="group flex w-[100%] hoverscreen:hover:bg-slate-200 cursor-pointer rounded-def">
        <Svg
          id={img}
          className="w-6 h-6 mr-[14px] object-cover"
          viewBox="0 0 24 24"
          fill="none"
        />
        <figcaption className="text-[17px] text-text-black">{name}</figcaption>
      </figure>
    </Menu.Item>
  );
};
