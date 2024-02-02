import {ReactElement } from "react";
import { Button } from "@/shared/ui";
import {Link} from "react-router-dom";
import {Step} from "@/features/authentication/reset-password/model/step";
import {
  resetPasswordPath
} from "@/features/authentication/reset-password/model/constants";
import {AUTH_FORM_VALUES_KEY} from "@/features/authentication/lib/constants";
import {useChangeStep} from "@/shared/lib/hooks";


export function CheckEmailStep(): ReactElement {
  const handlePrevStep = useChangeStep(AUTH_FORM_VALUES_KEY, resetPasswordPath, Step.ENTER_EMAIL);

  return (
    <div className="bg-white flex flex-col items-center justify-center pb-10 pt-30 px-30 rounded-2xl shadow-custom translate-x-10 w-500">
      <Button type='back' HTMLType='button' extraClass='self-start' onClick={() => handlePrevStep()}/>
      <p className="text-main-purple text-40 font-bold pb-20 pt-7 w-3/4 text-center">
        Проверьте вашу почту
      </p>
      <div className="flex flex-col pb-14">
        <p className='text-neutral-500 text-lg font-normal w-80 mb-6'>Вам на почту было выслано письмо</p>
        <p className='text-neutral-500 text-lg font-normal w-80 mb-6'>Для ввода нового пароля перейдите по ссылке в письме</p>
      </div>
      <div className='flex mt-107 border-b border-neutral-500'>
        <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
        <Link to='/register' className="text-neutral-500 hover:text-neutral-950 text-lg font-normal">Зарегистрируйтесь</Link>
      </div>
    </div>
  )
}
