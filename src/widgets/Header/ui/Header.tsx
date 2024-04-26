import {InputWithFilter} from "@/features/searchFilter";
import Logo from "./Logo";
import {ReactElement} from "react";
import { Button } from "@/shared";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "@/shared/lib";
import { Menu } from "./Menu";

export function Header(): ReactElement {
  const navigate = useNavigate();
  const access = selectAccessToken();

  const onLoginClick = () => {
    navigate('/login');
  }

  return (
    <header className="w-full flex items-center max-h-[50px]">
      <Logo/>
      <InputWithFilter/>
      <div className="ml-auto">
        {!access && <Button type='button' extraClass="!p-0" onClick={onLoginClick}>Войти</Button>}
        {access &&  <Menu />}
      </div>
    </header>
  );
}
