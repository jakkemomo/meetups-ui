import {ReactElement} from "react"
import {Button, Input} from "@/shared";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {passwordSchema, PasswordValidationSchema} from "../model/RegisterFormSchema";
import {registerThunk} from "../model/register";
import {goBack, passwordFilled, selectUserData} from "../model/formState";


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

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className="text-neutral-500 text-base md:text-lg font-normal mb-[10px]">Придумайте уникальный пароль</p>
        <Input
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          hookFormValues={register('password')}
          extraContentClass="p-3.5"
          extraInputClass="px-3"
        />
        <div className='flex mt-5 md:mt-18 pb-3.5 md:pb-3 items-center'>
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
          HTMLType='submit'
          type='primary'
          extraClass='mt-10 md:mt-6'
          disabled={!isValid && isSubmitted}
        >Зарегистрироваться</Button>
        <Button onClick={onPrev} HTMLType='button' type='secondary' extraClass='w-80 mt-5 flex justify-center hover:text-neutral-950 text-lg font-normal text-center'>Назад</Button>
      </form>
    )
  }
