import {ReactElement, useCallback} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginValidationSchema} from "@/features/authentication/login/model/LoginFormSchema";
import {Link, useNavigate} from "react-router-dom";
import {AUTH_FORM_VALUES_KEY} from "@/features/authentication/lib/constants";
import {ValueTextField} from "@/shared/types";
import {setFormValuesInStorage} from "@/shared/lib/saveAndGetFormValues";
import {useFilledValue} from "@/shared/lib/hooks";
import {useLoginMutation} from "@/entities/session/api/sessionApi.ts";
import {Button, Input, InputErrorMessage} from "@/shared";


interface ILoginFormProps {
  onComplete?: () => void;
}

export function LoginForm({onComplete}: ILoginFormProps): ReactElement {

  const {
    setError,
    formState: {errors, isValid, isSubmitted},
    handleSubmit,
    register,
    setValue,
    getValues
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginSchema)
  });

  const navigate = useNavigate();
  useFilledValue(AUTH_FORM_VALUES_KEY, setValue, [ValueTextField.EMAIL])
  const [
    loginTrigger,
  ] = useLoginMutation()

  const onSubmit = ({email, password}: LoginValidationSchema) => {
    setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email });
    loginTrigger({email, password})
        .unwrap()
        .then((payload) => onComplete?.())
        .catch((error) => setError('email', {message: error.data.detail}))
  }

  const onResetPasswordClick = useCallback(() => {
    const values = getValues();
    setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email: values.email });
  }, [navigate])

  return (
    <div className="bg-white flex flex-col items-center justify-center px-90 pb-9 pt-102 rounded-2xl shadow-custom translate-x-10 h-600">
      <p className="text-main-purple text-40 font-bold pb-9">
        Вход в Аккаунт
      </p>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Input
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          hookFormValues={register('email')}
          error={errors.email}
        />
        <Input
          extraClass='mt-3.5'
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          hookFormValues={register('password')}
          error={errors.password}
        />
        <Link
          to='/password/reset/'
          className="text-neutral-500 hover:text-neutral-950 font-normal text-base mt-2.5 mb-2"
          onClick={onResetPasswordClick}
        >
          Забыли пароль?
        </Link>
        <InputErrorMessage error={errors.email ?? errors.password}/>
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-4'
          disabled={!isValid && isSubmitted}
        >
          Войти
        </Button>
      </form>
      <div className='flex mt-107 border-b border-neutral-500'>
        <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
        <Link to='/register' className="text-neutral-500 hover:text-neutral-950 text-lg font-normal">Зарегистрируйтесь</Link>
      </div>
    </div>
  )
}
