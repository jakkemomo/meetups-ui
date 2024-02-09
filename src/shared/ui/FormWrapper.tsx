import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@uidotdev/usehooks";

interface ILoginFormProps {
  children: ReactElement;
  redirectType: 'login' | 'register'
}

export function FormWrapper({children, redirectType}: ILoginFormProps): ReactElement {
  const isMobileDevice = useMediaQuery("only screen and (max-width : 768px)");
  const redirectText = {
    login: ['Уже есть аккаунт?', 'Войти'],
    register: ['Нет аккаунта?', 'Зарегистрируйтесь']
  }

  const classNames = {
    container: {
      mobile: "bg-white flex flex-col items-center justify-center relative z-10",
      desktop: "bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10"
    },
    header: {
      mobile: "text-38 pb-10",
      desktop: "text-40 pb-60"
    },
    fonts: {
      mobile: "text-base",
      desktop: "text-lg"
    }
  }
  return (
    <div
      className={isMobileDevice ? classNames.container.mobile : classNames.container.desktop}>
      <p className={`text-main-purple font-bold ${isMobileDevice ? classNames.header.mobile : classNames.header.desktop}`}>
        Вход в Аккаунт
      </p>
      {children}
      <div className={`flex border-b border-neutral-500 ${isMobileDevice ? 'mt-101' : 'mt-107'}`}>
        <p className={`text-neutral-500 font-normal ${isMobileDevice ? classNames.fonts.mobile : classNames.fonts.desktop}`}>
          {redirectType === 'register' ? redirectText.register[0] : redirectText.login[0]}&nbsp;
        </p>
        <Link to={`/${redirectType}/`} className={`text-neutral-500 hover:text-neutral-950 font-normal ${isMobileDevice ? classNames.fonts.mobile : classNames.fonts.desktop}`}>
          {redirectType === 'register' ? redirectText.register[1] : redirectText.login[1]}
        </Link>
      </div>
    </div>
  )
}
