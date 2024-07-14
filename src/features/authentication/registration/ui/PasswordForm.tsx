import {ReactElement} from "react"
import {Button, PasswordInput} from "@/shared";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {passwordSchema, PasswordValidationSchema} from "../model/RegisterFormSchema";
import {goBack, passwordFilled, selectUserData} from "../model/formState";
import { useRegisterMutation } from "@/entities/session/api/sessionApi";
import Svg from "@/shared/ui/Svg";


export function PasswordForm(): ReactElement {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUserData);

    const {
      formState: { errors, isValid, isSubmitted },
      handleSubmit,
      register,
      setError,
    } = useForm<PasswordValidationSchema>({
      resolver: zodResolver(passwordSchema),
      defaultValues: data
    })

    const [
      registerTrigger,
      { isLoading }
    ] = useRegisterMutation();

    const regUser = (password: string) => {
      registerTrigger({...data, password: password})
        .unwrap()
        .then(() => dispatch(passwordFilled({password: password})))
        .catch((error: {data: {detail: string}}) => setError('password', {message: error.data.detail}))
    };

    const onPrev = () => dispatch(goBack());

    const onSubmit = ({password}: PasswordValidationSchema) => {
      regUser(password);
    }

    return (
      <form onSubmit={(data) => void handleSubmit(onSubmit)(data)} className="flex flex-col w-full max-w-[320px]">
        <p className="text-neutral-500 text-base md:text-lg font-normal">Придумайте уникальный пароль</p>
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
        <div className='flex mt-5 md:mt-18 md:pb-3 items-center'>
          {(isValid && isSubmitted) ? (
            <div
              className='w-[18px] h-[18px] mr-3 bg-center bg-no-repeat'
              style={{ backgroundImage: `url("/images/icon-checked.svg")` }}
            />
          ) : (
            <div className='bg-custom-gray w-[18px] h-[18px] rounded-full mr-3' />
          )}
          <p className={`text-base md:text-lg font-normal  ${errors.password ? 'text-input-error' : 'text-neutral-500'}`}>
            Минимум 8 символов
          </p>
        </div>
        <Button
          type='submit'
          importance="primary"
          extraClass='mt-[60px] md:mt-6'
          size="xl"
          disabled={(!isValid && isSubmitted) || isLoading}
        >Зарегистрироваться</Button>
        <Button
          onClick={onPrev}
          extraClass='self-center !rounded-none !p-0 mt-5 text-[18px] leading-def'
        >Назад</Button>
      </form>
    )
  }
