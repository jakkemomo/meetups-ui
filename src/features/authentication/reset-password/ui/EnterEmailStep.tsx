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
import Svg from "@/shared/ui/Svg";

export function EnterEmailStep(): ReactElement  {
  const {
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    setValue,
    setError,
    register,
  } = useForm<EmailValidationSchema>({
    resolver: zodResolver(emailSchema)
  });

  const navigate = useNavigate();
  const [
    postResetPassword,
    { isLoading: isLoading }
  ] = useResetPasswordMutation();

  useFilledValue(AUTH_FORM_VALUES_KEY, setValue, [ValueTextField.EMAIL]);

  const handleNextStep = useChangeStep(AUTH_FORM_VALUES_KEY, resetPasswordPath, Step.CHECK_EMAIL);
  const handlePrevStep = () => navigate('/login');

  const onSubmit = useCallback(({email}: EmailValidationSchema) => {
    postResetPassword({email})
      .unwrap()
      .then(() => {
        handleNextStep({email});
      })
      .catch((err: {status: number}) => {
        if (err.status === 400) {
          setError('email', {message: 'Почта не зарегестрирована'})
        } else {
          console.log(`Some server error ${JSON.stringify(err)}`);
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormWrapper redirectType='register' headerText='Забыли пароль?' >
      <form noValidate onSubmit={(data) => void handleSubmit(onSubmit)(data)} className="flex flex-col px-0 md:px-90">
        <p className='text-neutral-500 text-base md:text-lg font-normal w-80 mb-3 md:mb-5 mt-6 md:mt-5'>Для подтверждения личности введите вашу почту</p>
        <Input
          type='email'
          head={<Svg className="w-6 h-6" id="email-icon" />}
          extraInputClass="pl-3"
          placeholder='Почта'
          isError={!!errors.email}
          size="md"
          hookFormRegister={register('email')}
          className="text-[18px]"
        />
        {errors.email && <InputErrorMessage error={errors.email} />}
        <Button
          type='submit'
          importance="primary"
          extraClass={`mt-9 md:mt-5 ${errors.email ? "!mt-4" : ""}`}
          size="xl"
          disabled={(!isValid && isSubmitted) || isLoading}
        >
          Далее
          <Svg className="w-6 h-6 absolute top-1/2 right-5 translate-y-[-50%]" id="next-arrow" />
        </Button>
        <Button
          type='button'
          onClick={handlePrevStep}
          extraClass='self-center !rounded-none !p-0 text-[18px] leading-def mt-6'
        >Назад</Button>
      </form>
    </FormWrapper>
  )
}
