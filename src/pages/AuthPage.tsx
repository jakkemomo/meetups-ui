import { FC } from "react"
import {Button, Input} from "@/shared/ui";
// import Registration from "@/component/Auth/Registration";
// import Login from "@/component/Auth/Login";

interface Prop {
    type: "registration" | "login"
}

const AuthPage: FC<Prop> = ({type}) => {
  return (
    <section className="bg-light-gray w-full relative flex items-center justify-center">
      <div className="bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
        <p className="text-main-purple text-40 font-bold pb-60">
            Вход в Аккаунт
        </p>
        <form className=''>
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
    </section>
  )
}

export default AuthPage
