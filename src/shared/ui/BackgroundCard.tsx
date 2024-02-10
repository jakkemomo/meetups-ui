import {ReactElement} from "react";
import {useMediaQuery} from "@uidotdev/usehooks";

interface IBackgroundCardProps {
  cardType: 'LOGIN' | 'WELCOME' | 'VISIT_EVENTS' | 'FIND_FRIENDS' | 'CREATE_EVENTS'
}

export function BackgroundCard({cardType}: IBackgroundCardProps): ReactElement  {

  const text = {
    LOGIN: ['Войдите', 'в MEVENT', 'Войдите в свой аккаунт, чтобы использовать весь функционал приложения'],
    WELCOME: ['Добро пожаловать', 'в MEVENT', 'Зарегистрируйтесь, чтобы использовать весь функционал приложения'],
    VISIT_EVENTS: ['Посещайте', 'МЕРОПРИЯТИЯ', 'Знакомьтесь с новыми людьми и интересно проводите свое свободное время'],
    FIND_FRIENDS: ['Находите', 'ДРУЗЕЙ', 'Посещайте мероприятия вместе с друзьями и заводите новых через нашу платформу'],
    CREATE_EVENTS: ['Создавайте', 'МЕРОПРИЯТИЯ', 'Организовывайте собственные мероприятия и находите единомышленников']
  }

  const isMobileDevice = useMediaQuery("only screen and (max-width : 768px)");

  const pageText = text[cardType];

  return (
    <>
      {isMobileDevice ? (
        <div className='flex flex-col w-full h-full absolute top-0 left-0'>
          <div className='bg-no-repeat bg-left-top w-full h-full' style={{ backgroundImage: `url("/images/bg-corner-left.png")` }}></div>
          <div className='bg-no-repeat bg-right-bottom w-full h-full' style={{ backgroundImage: `url("/images/bg-corner-right.png")` }}></div>
        </div>
      ) : (
        <div
          className='w-600 h-700 bg-center bg-no-repeat rounded-2xl shadow-custom flex items-center justify-center'
          style={{ backgroundImage: `url("/images/auth-bg.png")` }}
        >
          <div className='w-4/6 flex flex-col items-center justify-center text-main-dark-blue text-center'>
            <span className='font-bold text-34'>{pageText[0]}</span>
            <span className='font-bold text-50'>{pageText[1]}</span>
            <p className='w-3/4 font-semibold text-lg'>{pageText[2]}</p>
          </div>
        </div>
      )}
    </>
  )
}
