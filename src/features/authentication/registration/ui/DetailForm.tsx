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
import { useCheckEmailMutation } from "@/entities/session/api/sessionApi";


export function DetailForm(): ReactElement {
    const data = useAppSelector(selectUserData);

    const {
      formState: { errors, isValid, isSubmitted },
      setError,
      handleSubmit,
      register,
    } = useForm<UserDataValidationSchema>({
      resolver: zodResolver(userDataSchema),
      defaultValues: data
    })

    const dispatch = useAppDispatch();

    const [
      checkEmailTrigger,
    ] = useCheckEmailMutation()

    const onSubmit = ({username, email}: UserDataValidationSchema) => {
      // setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email });
      checkEmailTrigger({email})
          .unwrap()
          .then((payload) => {
            if (payload) {
              setError('email', {message: "This email address is already in use"});
            } else {
              dispatch(userDataFilled({username: username, email: email}));
            }
          })
          .catch((error) => console.log(`Some server error ${error}`))
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
