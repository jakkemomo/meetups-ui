import { Menu } from "@headlessui/react";
import { MenuItem } from "./menuItem";
import { menuItems } from "../lib/menuItems";
import { selectRefreshToken } from "@/shared/lib";
import { LogoutButton } from "@/features/authentication/logout";

export function BurgerMenu() {

  const refresh = selectRefreshToken();
  const menuList = menuItems.map(({ img, name, link }, id) => (
    <MenuItem img={img} name={name} link={link} key={id} />
  ));

  return (
    <Menu.Items className="absolute flex flex-col right-[25px] top-[12px] z-[11] mt-10 w-[293px] h-[410px] px-10 py-[30px] rounded-[20px] bg-white shadow drop-shadow-bm justify-start items-start gap-[15px] inline-flex focus:outline-none">
      {menuList}
      {refresh && <LogoutButton refresh={refresh} />}
    </Menu.Items>
  );
}

