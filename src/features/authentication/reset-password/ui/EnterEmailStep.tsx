import {ReactElement, useCallback} from "react";
import {Button, Input, InputErrorMessage} from "@/shared/ui";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  EmailValidationSchema
} from "@/features/authentication/reset-password/model/ResetPasswordFormSchema";
import {Step} from "@/features/authentication/reset-password/model/step";
import {Link, useNavigate} from "react-router-dom";
import {useResetPasswordMutation} from "@/features/authentication/reset-password/api/resetPasswordApi";
import {resetPasswordPath} from "@/features/authentication/reset-password/model/constants";
import {ValueTextField} from "@/shared/types";
import {AUTH_FORM_VALUES_KEY} from "@/features/authentication/lib/constants";
import {useChangeStep, useFilledValue} from "@/shared/lib/hooks";

export function EnterEmailStep(): ReactElement  {
  const {
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    setValue,
    register,
  } = useForm<EmailValidationSchema>({
    resolver: zodResolver(emailSchema)
  });

  const navigate = useNavigate();
  const [ postResetPassword ] = useResetPasswordMutation();
  useFilledValue(AUTH_FORM_VALUES_KEY, setValue, [ValueTextField.EMAIL]);
  const handleNextStep = useChangeStep(AUTH_FORM_VALUES_KEY, resetPasswordPath, Step.CHECK_EMAIL);
  const handlePrevStep = () => {
    navigate('/login');
  }

  const onSubmit = useCallback(({email}: EmailValidationSchema) => {
    postResetPassword({email})
      .unwrap()
      .then(() => {
        handleNextStep({email});
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="bg-white flex flex-col items-center justify-center pb-9 pt-102 px-30 rounded-2xl shadow-custom translate-x-10 w-500 h-600">
      <p className="text-main-purple text-40 font-bold pb-14">
        Забыли пароль?
      </p>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className='text-neutral-500 text-lg font-normal w-80 mb-5'>Для подтверждения личности введите вашу почту</p>
        <Input
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          hookFormValues={register('email')}
          extraClass='mb-2.5'
          error={errors.email}
        />
        <InputErrorMessage error={errors.email} />
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-5'
          iconType='next'
          disabled={!isValid && isSubmitted}
        >
          Далее
        </Button>
        <Button type='secondary' HTMLType='button' onClick={handlePrevStep} extraClass='mt-6'>Назад</Button>
      </form>
      <div className='flex pt-60 border-b border-neutral-500'>
        <p className='text-neutral-500 text-lg font-normal'>Нет аккаунта?&nbsp;</p>
        <Link to='/register' className="text-neutral-500 hover:text-neutral-950 text-lg font-normal">Зарегистрируйтесь</Link>
      </div>
    </div>
  )
}
