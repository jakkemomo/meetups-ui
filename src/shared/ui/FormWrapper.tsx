import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@uidotdev/usehooks";

interface ILoginFormProps {
  children: ReactElement;
  headerText: string;
  redirectType: 'login' | 'register'
}

export function FormWrapper({children, headerText, redirectType}: ILoginFormProps): ReactElement {
  const isMobileDevice = useMediaQuery("only screen and (max-width : 768px)");
  const redirectText = {
    login: ['Уже есть аккаунт?', 'Войти'],
    register: ['Нет аккаунта?', 'Зарегистрируйтесь']
  }

  const classNames = {
    container: {
      mobile: "items-center justify-center relative z-10 w-full bg-transparent",
      desktop: "justify-between pb-[38px] w-500 h-600 pt-102 rounded-2xl shadow-custom translate-x-10 bg-white"
    },
    header: {
      mobile: "text-38 pb-10",
      desktop: "text-40 pb-[37px]"
    },
    fonts: {
      mobile: "text-base",
      desktop: "text-lg"
    }
  }

  return (
    <div className={`flex flex-col items-center ${isMobileDevice ? classNames.container.mobile : classNames.container.desktop}`}>
      <div className='flex flex-col items-center justify-center w-full'>
        <p className={`text-main-purple font-bold w-11/12 md:w-3/4 text-center text-38 md:text-40 pb-10 mb:pb-[37px`}>
          {headerText}
        </p>
        {children}
      </div>
      <div className={`flex border-b border-neutral-500 ${isMobileDevice && 'mt-[70px]'}`}>
        <p className={`text-neutral-500 font-normal text-base md:text-lg`}>
          {redirectType === 'register' ? redirectText.register[0] : redirectText.login[0]}&nbsp;
        </p>
        <Link to={`/${redirectType}/`} className={`text-neutral-500 hover:text-neutral-950 font-normal text-base md:text-lg`}>
          {redirectType === 'register' ? redirectText.register[1] : redirectText.login[1]}
        </Link>
      </div>
    </div>
  )
}
