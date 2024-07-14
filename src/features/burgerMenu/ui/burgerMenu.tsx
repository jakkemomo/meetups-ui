import { Menu } from "@headlessui/react";
import { MenuItem } from "./menuItem";
import { menuItems } from "../lib/menuItems";
import { selectRefreshToken } from "@/shared/lib";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/entities/session/api/sessionApi";

export function BurgerMenu() {
  const refresh = selectRefreshToken();
  const navigate = useNavigate();

  const menuList = menuItems.map(({ img, name, link }, id) => (
    <MenuItem img={img} name={name} onClick={() => navigate(link)} key={id} />
  ));

  const [logoutTrigger] = useLogoutMutation();

  const onConfirmLogout = () => {
    if (refresh) {
      logoutTrigger({ refresh })
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Menu.Items className="absolute flex-col right-[25px] top-[62px] z-50 w-[293px] h-[410px] px-10 py-[30px] rounded-[20px] bg-white shadow-shadow-bm justify-start items-start gap-[15px] inline-flex focus:outline-none">
      {menuList}
      {refresh && <MenuItem img='bm-logout' name='Выйти из профиля' onClick={() => onConfirmLogout()} />}
    </Menu.Items>
  );
}
