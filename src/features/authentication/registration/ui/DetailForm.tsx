import {ReactElement} from "react"
import {Button, Input, InputErrorMessage} from "@/shared";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  userDataSchema,
  UserDataValidationSchema
} from "@/features/authentication/registration/model/RegisterFormSchema";
import {useAppDispatch, useAppSelector} from "@/shared/model";
import {selectUserData, userDataFilled} from "../model/formState";


export function DetailForm(): ReactElement {
    const data = useAppSelector(selectUserData);

    const {
      formState: { errors, isValid, isSubmitted },
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
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <p className="text-neutral-500 text-base md:text-lg font-normal mb-[10px]">Отображаемое другим людям</p>
        <Input
          HTMLType='text'
          iconType='person'
          placeholder='Имя пользователя'
          error={errors.username}
          hookFormValues={register('username')}
        />
        <Input
          extraClass='mt-3.5 mb-3 md:mb-2.5'
          HTMLType='email'
          iconType='mail'
          placeholder='Почта'
          error={errors.email}
          hookFormValues={register('email')}
        />
        <InputErrorMessage error={errors.email ?? errors.username} />
        <Button
          HTMLType='submit'
          type='primary'
          extraClass='mt-6 md:mt-5'
          iconType="next"
          disabled={!isValid && isSubmitted}
        >Далее</Button>
      </form>
    )
  }
