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
import Svg from "@/shared/ui/Svg";


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
      { isLoading: isLoading }
    ] = useCheckEmailMutation()

    const onSubmit = ({username, email}: UserDataValidationSchema) => {
      // setFormValuesInStorage(AUTH_FORM_VALUES_KEY, { email });
      checkEmailTrigger({email})
          .unwrap()
          .then((payload) => {
            if (payload) {
              setError('email', {message: "Этот почтовый адрес уже используется"});
            } else {
              dispatch(userDataFilled({username: username, email: email}));
            }
          })
          .catch((error) => console.log(`Some server error ${error}`))
    }

    return (
      <form noValidate onSubmit={(data) => void handleSubmit(onSubmit)(data)} className="flex flex-col w-full max-w-[320px]">
        <p className="text-neutral-500 text-base md:text-lg font-normal mb-[10px]">Отображаемое другим людям</p>
        <Input
          type='text'
          head={<Svg className="w-6 h-6" id="person-icon" />}
          placeholder='Имя пользователя'
          isError={!!errors.username}
          hookFormRegister={register('username')}
          extraInputClass="pl-3"
          size="md"
        />
        <Input
          type='email'
          head={<Svg className="w-6 h-6" id="email-icon" />}
          placeholder='Почта'
          isError={!!errors.email}
          hookFormRegister={register('email')}
          size="md"
          extraInputClass="pl-3"
          className="mt-3.5"
        />
        {
          (errors.email ?? errors.username) && (<InputErrorMessage error={errors.email ?? errors.username} />)
        }
        <Button
          type='submit'
          size="xl"
          importance="primary"
          extraClass={`mt-11 md:mt-5 ${(errors.email ?? errors.username) ? "!mt-[21px]" : ""}`}
          disabled={(!isValid && isSubmitted) || isLoading}
        >
          Далее
          <Svg className="w-6 h-6 absolute top-1/2 right-5 translate-y-[-50%]" id="next-arrow" />
        </Button>
      </form>
    )
  }
