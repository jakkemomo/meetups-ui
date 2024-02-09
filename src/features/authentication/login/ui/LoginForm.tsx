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
import {FormWrapper, Button, Input, InputErrorMessage} from "@/shared/ui";
import {useMediaQuery} from "@uidotdev/usehooks";


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
  ] = useLoginMutation();

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
    <FormWrapper redirectType='register' headerText='Вход в Аккаунт'>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-0 md:px-90">
        <Input
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          error={errors.email}
          hookFormValues={register('email')}
        />
        <Input
          extraClass='mt-3.5'
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          error={errors.password}
          hookFormValues={register('password')}
        />
        <Link
          to='/password/reset/'
          className="text-neutral-500 hover:text-neutral-950 font-normal text-base mt-2.5 mb-2"
          onClick={onResetPasswordClick}
        >
          Забыли пароль?
        </Link>
        <InputErrorMessage error={errors.email ?? errors.password} />
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-[21px] md:mt-[15px] mb-[31px] md:mb-0'
          disabled={!isValid && isSubmitted}
        >
          Войти
        </Button>
      </form>
    </FormWrapper>
  )
}
