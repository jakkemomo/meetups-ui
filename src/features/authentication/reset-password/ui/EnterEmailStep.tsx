import {ReactElement, useCallback} from "react";
import {Button, FormWrapper, Input, InputErrorMessage} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  emailSchema,
  EmailValidationSchema
} from "@/features/authentication/reset-password/model/ResetPasswordFormSchema";
import {Step} from "@/features/authentication/reset-password/model/step";
import {useNavigate} from "react-router-dom";
import {useResetPasswordMutation} from "@/features/authentication/reset-password/api/resetPasswordApi";
import {resetPasswordPath} from "@/features/authentication/reset-password/model/constants";
import {ValueTextField} from "@/shared/types";
import {AUTH_FORM_VALUES_KEY} from "@/features/authentication/lib/constants";
import {useFilledValue} from "@/shared/lib/hooks";
import {useChangeStep} from "@/features/authentication/reset-password/lib/hooks/useChangeStep";

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
    <FormWrapper redirectType='register' headerText='Забыли пароль?' >
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-0 md:px-90">
        <p className='text-neutral-500 text-base md:text-lg font-normal w-80 mb-3 md:mb-5 mt-6 md:mt-5'>Для подтверждения личности введите вашу почту</p>
        <Input
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          hookFormValues={register('email')}
          extraBoxClass='mb-2.5'
          error={errors.email}
        />
        <InputErrorMessage error={errors.email} />
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-9 md:mt-5'
          iconType='next'
          disabled={!isValid && isSubmitted}
        >
          Далее
        </Button>
        <Button type='secondary' HTMLType='button' onClick={handlePrevStep} extraClass='mt-6'>Назад</Button>
      </form>
    </FormWrapper>
  )
}
