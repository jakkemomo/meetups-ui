import {ReactElement} from "react";

export function BackgroundCard(): ReactElement  {
  return (
    <div
      className='w-600 h-700 bg-center bg-no-repeat rounded-2xl shadow-custom flex items-center justify-center'
      style={{ backgroundImage: `url("/images/auth-bg.png")` }}
    >
      <div className='w-2/4 flex flex-col items-center justify-center text-main-dark-blue text-center'>
        <span className='font-bold text-34'>Войдите</span>
        <span className='font-bold text-50'>в MEVENT</span>
        <p className='font-semibold text-lg'>Войдите в свой аккаунт, чтобы использовать весь функционал приложения</p>
      </div>
    </div>
  )
}
