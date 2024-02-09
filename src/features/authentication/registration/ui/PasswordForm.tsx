import { ReactElement } from "react"
import {Button, Input, InputErrorMessage} from "@/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { PasswordValidationSchema, passwordSchema } from "../model/RegisterFormSchema";
import { registerThunk } from "../model/register";
import { goBack, selectUserData, passwordFilled } from "../model/formState";


export function PasswordForm(): ReactElement {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUserData);

    const {
      formState: { errors, isValid, isSubmitted },
      handleSubmit,
      register,
    } = useForm<PasswordValidationSchema>({
      resolver: zodResolver(passwordSchema),
      defaultValues: data
    })

    const regUser = (password: string) => {
      dispatch(registerThunk({...data, password: password}))
        .unwrap()
        .then(() => dispatch(passwordFilled({password: password})))
        .catch((error) => {
          console.log("Register error ", error.message);
        })
    };

    const onPrev = () => dispatch(goBack());

    const onSubmit = (data: PasswordValidationSchema) => {
      regUser(data.password);
    }

    const helperTextColor = isSubmitted ? isValid ? 'text-emerald-500' : 'text-rose-600' : 'text-neutral-500';
    const helperBeforeBg = isSubmitted ? isValid ? "before:bg-emerald-500": "before:bg-rose-600" : "before:bg-custom-gray";
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className="text-neutral-500 text-base md:text-lg font-normal mb-[10px]">Придумайте уникальный пароль</p>
        <Input
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          hookFormValues={register('password')}
        />
        <p className={`before:h-[18px] before:w-[18px] before:inline-block before:rounded-full ${helperBeforeBg} before:text-[rgba(0,0,0,0)]  before:mr-[12px] text-base md:text-lg font-normal mt-5 md:mt-[18px] mb-3.5 md:mb-3 ${helperTextColor}`}>Минимум 8 символов</p>
        <InputErrorMessage error={errors.password} />
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-10 md:mt-6'
          disabled={!isValid && isSubmitted}
        >Зарегистрироваться</Button>
        <Button onClick={onPrev} HTMLType='button' type='secondary' extraClass='w-80 mt-5 flex justify-center hover:text-neutral-950 text-lg font-normal text-center'>Назад</Button>
      </form>
    )
  }
