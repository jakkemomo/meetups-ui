import { ReactElement} from "react"
import { BackgroundCard, Button, Input } from "@/shared/ui";
import {useForm} from "react-hook-form";
import {TLoginForm} from "@/features/authentication/login/types";


export function LoginForm(): ReactElement  {

  const { handleSubmit } = useForm<TLoginForm>()
  const onSubmit = (data: TLoginForm) => {
    console.log(data);
  }

  return (
    <>
      <div className="bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
        <p className="text-main-purple text-40 font-bold pb-60">
          Вход в Аккаунт
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input HTMLType='email' name='loginEmail' value='' iconType='mail' placeholder='Почта'/>
          <Input extraClass='mb-2.5 mt-18' HTMLType='password' name='loginPassword' value='' iconType='password' placeholder='Пароль'/>
          <Button HTMLType='button' type='secondary' extraClass='text-base'>Забыли пароль?</Button>
          <Button HTMLType='submit' type='primary' extraClass='mt-5'>Войти</Button>
        </form>
        <div className='flex mt-28'>
          <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
          <Button HTMLType='button' type='secondary'>Зарегистрируйтесь</Button>
        </div>
      </div>
    </>
  )
}
