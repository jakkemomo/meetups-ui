import {ReactElement } from "react";
import {Link} from "react-router-dom";


export function CheckEmailStep(): ReactElement {

  return (
    <div className="bg-white flex flex-col items-center justify-center pb-9 pt-102 px-30 rounded-2xl shadow-custom translate-x-10 w-500 h-600">
      <p className="text-main-purple text-40 font-bold pb-20 w-3/4 text-center">
        Проверьте вашу почту
      </p>
      <div className="flex flex-col">
        <p className='text-neutral-500 text-lg font-normal w-80 mb-6'>Вам на почту было выслано письмо</p>
        <p className='text-neutral-500 text-lg font-normal w-80'>Для ввода нового пароля перейдите по ссылке в письме</p>
      </div>
      <div className='flex mt-40 border-b border-neutral-500'>
        <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
        <Link to='/register' className="text-neutral-500 hover:text-neutral-950 text-lg font-normal">Зарегистрируйтесь</Link>
      </div>
    </div>
  )
}
