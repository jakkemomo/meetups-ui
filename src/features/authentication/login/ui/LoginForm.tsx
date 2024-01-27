import {ReactElement} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginValidationSchema} from "@/features/authentication/login/model/LoginFormSchema";
import {useLoginMutation} from "@/entities/session/api/sessionApi.ts";
import {Button, Input} from "@/shared";
import { Link } from "react-router-dom";


interface ILoginFormProps {
  onComplete?: () => void;
}

export function LoginForm({onComplete}: ILoginFormProps): ReactElement {

  const {
    setError,
    formState: {errors, isDirty, isSubmitting},
    handleSubmit,
    register,
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginSchema)
  });

  const [
    loginTrigger,
  ] = useLoginMutation()

  const onSubmit = ({email, password}: LoginValidationSchema) => {
    loginTrigger({email, password})
        .unwrap()
        .then((payload) => onComplete?.())
        .catch((error) => setError('email', {message: error.data.detail}))
  }

  return (
      <div
          className="bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
        <p className="text-main-purple text-40 font-bold pb-60">
          Вход в Аккаунт
        </p>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
              HTMLType='email'
              iconType='mail'
              placeholder='Почта'
              error={errors.email}
              hookFormValues={register('email')}
          />
          <Input
              extraClass='mt-18'
              HTMLType='password'
              iconType='password'
              placeholder='Пароль'
              error={errors.password}
              hookFormValues={register('password')}
          />
          <Button HTMLType='button' type='secondary' extraClass='text-base mt-2.5'>Забыли пароль?</Button>
          <Button
              HTMLType='submit'
              type='primary'
              extraClass='mt-5'
              disabled={!isDirty || isSubmitting}
          >
            Войти
          </Button>
        </form>
        <div className='flex mt-28'>
          <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
          <Link className="text-neutral-500 hover:text-neutral-950 text-lg font-normal" to="/register">Зарегистрируйтесь</Link>
        </div>
      </div>
  )
}
