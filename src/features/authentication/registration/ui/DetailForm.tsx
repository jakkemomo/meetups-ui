import { ReactElement } from "react"
import { Button, Input } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataValidationSchema, userDataSchema } from "@/features/authentication/registration/model/RegisterFormSchema";
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {selectUserData, userDataFilled} from "../model/formState";


export function DetailForm(): ReactElement {
    const data = useAppSelector(selectUserData);
  
    const {
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<UserDataValidationSchema>({
      resolver: zodResolver(userDataSchema),
      defaultValues: data
    })
  
    const dispatch = useAppDispatch();
  
    const onSubmit = (data: UserDataValidationSchema) => {
      // TODO: Check email emailRef.current?.value
      dispatch(userDataFilled({username: data.username, email: data.email}))
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input 
          HTMLType='text'
          iconType='person'
          placeholder='Имя пользователя'
          error={errors.username}
          hookFormValues={register('username')}
        />
        <Input 
          extraClass='mt-18'
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          error={errors.email}
          hookFormValues={register('email')}
        />
        <Button HTMLType='submit' type='primary' extraClass='mt-5' iconType="next">Далее</Button>
      </form>
    )
  }
