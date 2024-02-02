import {ReactElement, useCallback} from "react";
import { Button, Input } from "@/shared/ui";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  PasswordValidationSchema
} from "@/features/authentication/reset-password/model/ResetPasswordFormSchema";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useConfirmResetPasswordMutation} from "@/features/authentication/reset-password/api/resetPasswordApi";
import {RESET_PASSWORD_FORM_VALUES_KEY} from "@/features/authentication/reset-password/model/constants";
import {ValueTextField} from "@/shared/types";
import {useFilledValue} from "@/shared/lib/hooks";

interface ILoginFormProps {
  onComplete?: () => void;
}

export function EnterNewPasswordStep({onComplete}: ILoginFormProps): ReactElement  {
  const {
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    register,
    setValue,
  } = useForm<PasswordValidationSchema>({
    resolver: zodResolver(passwordSchema)
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [ postConfirmResetPassword ] = useConfirmResetPasswordMutation();
  useFilledValue(RESET_PASSWORD_FORM_VALUES_KEY, setValue, [ValueTextField.PASSWORD]);

  const onSubmit = useCallback(({password}: PasswordValidationSchema) => {
    const token = searchParams.get("token");
    if (token === null) return;
    postConfirmResetPassword({password, token})
      .unwrap()
      .then(() => {
        navigate('/login/');
        onComplete?.();
      })
      .catch(err => console.log(err))
  }, [searchParams]);

  const onPrevClick = () => {
    navigate('/password/reset/');
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center pb-10 pt-30 px-30 pt-102 rounded-2xl shadow-custom translate-x-10 w-500">
      <Button type='back' HTMLType='button' extraClass='self-start' onClick={onPrevClick}/>
      <p className="text-main-purple text-40 font-bold pb-12 pt-7">
        Новый пароль
      </p>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className='text-neutral-500 text-lg font-normal w-80 mb-5'>Придумайте уникальный пароль</p>
        <Input
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          error={errors.password}
          hookFormValues={register('password')}
        />
        <p className='text-neutral-500 text-lg font-normal w-80 pt-5'>Минимум 6 символов</p>
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-11'
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
