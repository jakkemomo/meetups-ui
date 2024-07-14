import {InputWithFilter} from "@/features/searchFilter";
import Logo from "./Logo";
import {ReactElement} from "react";
import { Button } from "@/shared";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi";
import HeaderLoader from "./HeaderLoader";

export function Header(): ReactElement {
  const navigate = useNavigate();

  const {
    isSuccess,
    isLoading,
    isError
  } = useMyDetailsQuery();

  const onLoginClick = () => {
    navigate('/login');
  }

  const onRegisterClick = () => {
    navigate('/register');
  }

  if (isLoading) {
    return <HeaderLoader />
  }

  return (
    <header className="w-full flex items-center max-h-[50px]">
      <Logo/>
      <InputWithFilter/>
      <div className="ml-auto">
        {isError && (
          <>
            <Button
              type='button'
              extraClass="!p-0 text-but-primary font-semibold hoverscreen:hover:text-[#332FA0] active:text-[#332FA0]"
              onClick={onLoginClick}
            >Войти</Button>
            <Button
              type="button"
              size="sm"
              importance="primary"
              extraClass="ml-5"
              onClick={onRegisterClick}
            >Регистрация</Button>
          </>
        )}
        {isSuccess && <Menu />}
      </div>
    </header>
  );
}
