import {ReactElement, useCallback} from "react";
import { Button, Input } from "@/shared/ui";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginSchema, LoginValidationSchema} from "@/features/authentication/login/model/LoginFormSchema";
import {loginThunk} from "@/features/authentication/login/model/login";
import {useAppDispatch} from "@/shared/model";

interface ILoginFormProps {
  onComplete?: () => void;
}

export function LoginForm({onComplete}: ILoginFormProps): ReactElement  {
  const {
    setError,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginValidationSchema>({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data)
      console.log(
        "validation result",
        await zodResolver(loginSchema)(data, context, options)
      )
      return zodResolver(loginSchema)(data, context, options);
    }
    // resolver: zodResolver(formValidationSchema)
  });

  const dispatch = useAppDispatch();


  const onSubmit = useCallback(({email, password}: LoginValidationSchema) => {
    console.log(`onSubmit`, email);
    dispatch(loginThunk({email, password}))
      .unwrap()
      .then(() => onComplete?.())
      .catch((error) => {
        setError('email', {type: 'server', message: error.message})
      })
    }, []
  );

  return (
    <div className="bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
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
        <Button HTMLType='button' type='secondary'>Зарегистрируйтесь</Button>
      </div>
    </div>
  )
}
