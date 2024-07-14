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
import {Button, FormWrapper, Input, InputErrorMessage} from "@/shared/ui";
import Svg from "@/shared/ui/Svg";
import { PasswordInput } from "@/shared";


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
    { isLoading: isLoading }
  ] = useLoginMutation();

  const onSubmit = ({email, password}: LoginValidationSchema) => {
    setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email });
    loginTrigger({email, password})
        .unwrap()
        .then(() => onComplete?.())
        .catch((error: {data: {detail: string}}) => setError('email', {message: error.data.detail}))
  }

  const onResetPasswordClick = useCallback(() => {
    const values = getValues();
    setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email: values.email });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <FormWrapper redirectType='register' headerText='Вход в Аккаунт'>
      <form noValidate onSubmit={(data) => void handleSubmit(onSubmit)(data)} className="flex flex-col px-0 w-full max-w-[320px] md:px-90">
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
        <PasswordInput
          type='password'
          head={<Svg className="w-6 h-6" id="password-icon" />}
          placeholder='Пароль'
          extraInputClass="pl-3"
          isError={!!errors.password}
          hookFormRegister={register('password')}
          size="md"
          className="mt-3.5 text-[18px] !pr-5"
        />
        <Link
          to='/password/reset/'
          className="text-neutral-500 hover:text-neutral-950 font-normal text-base mt-2.5 self-start"
          onClick={onResetPasswordClick}
        >
          Забыли пароль?
        </Link>
        {
          (errors.email ?? errors.password) && (<InputErrorMessage error={errors.email ?? errors.password} />)
        }
        <Button
          type='submit'
          size="xl"
          importance="primary"
          extraClass={`mt-[47px] md:mt-[15px] md:mb-0 ${(errors.email ?? errors.password) ? "!mt-[15px]" : ""}`}
          disabled={(!isValid && isSubmitted) || isLoading}
        >
          Войти
        </Button>
      </form>
    </FormWrapper>
  )
}
