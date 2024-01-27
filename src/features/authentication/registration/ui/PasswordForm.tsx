import { ReactElement } from "react"
import { Button, Input } from "@/shared/ui";
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
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<PasswordValidationSchema>({
      resolver: zodResolver(passwordSchema),
      defaultValues: data.password
    })
    
    const onPrev = () => dispatch(goBack());
  
    const regUser = (password: string) => {
      dispatch(registerThunk({...data, password: password}))
        .unwrap()
        .then(() => dispatch(passwordFilled({password: password})))
        .catch((error) => {
          console.log("Register error ", error.message);
        })
    };
  
    const onSubmit = (data: PasswordValidationSchema) => {
      regUser(data.password);
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          HTMLType='password'
          iconType='password'
          placeholder='Пароль'
          error={errors.password}
          hookFormValues={register('password')}
        />
        <Button HTMLType='submit' type='primary' extraClass='mt-5'>Зарегистрироваться</Button>
        <Button onClick={onPrev} HTMLType='button' type='secondary' extraClass='w-80 mt-5 flex justify-center hover:text-neutral-950 text-lg font-normal text-center'>Назад</Button>
      </form> 
    )
  }
