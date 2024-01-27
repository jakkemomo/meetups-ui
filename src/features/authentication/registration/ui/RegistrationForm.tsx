import { Dispatch, ReactElement, SetStateAction, createContext, useCallback, useContext, useRef, useState} from "react"
import { Button, Input } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordValidationSchema, UserDataValidationSchema, passwordSchema, userDataSchema } from "@/features/authentication/registration/model/RegistrationFormSchema";
import { Link, useNavigate } from "react-router-dom";
import { produce } from 'immer';
import { registerThunk } from "../model/register";
import {useAppDispatch} from "@/shared/model";


const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    details: {
      value: {
        username: '',
        email: '',
      },
    },
    password: {
      value: {
        password: '',
      },
    },
  },
};


const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
      form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
  ) => {},
});

interface IRegisterFormProps {
  setBGCardType: Dispatch<SetStateAction<"WELCOME" | "VISIT_EVENTS" | "FIND_FRIENDS">>
}

export function RegistrationMultiStepFormContainer({setBGCardType}: IRegisterFormProps): ReactElement {
  const [form, setForm] = useState(FORM_STATE);

  return (
      <FormStateContext.Provider value={{form, setForm}}>
        <CreateRegistrationMultiStepForm setBGCardType={setBGCardType}/>
      </FormStateContext.Provider>
  );
}


function CreateRegistrationMultiStepForm({setBGCardType}: IRegisterFormProps): ReactElement {
  const { form, setForm } = useContext(FormStateContext);

  const next = useCallback(() => {
      setForm(
        produce((form) => {
            form.selectedIndex += 1;
        })
      );
  }, [setForm]);

  const prev = useCallback(() => {
      setForm(
        produce((form) => {
            form.selectedIndex -= 1;
        })
      );
  }, [setForm]);

  const selectedIndex = form.selectedIndex;

  const tabs = [
    <RegistrationDetailForm onNext={next}/>,
    <RegistrationPasswordForm onPrev={prev} onComplete={next}/>,
    <CheckEmailForm/>
  ];

  const titles = [
    "Регистрация",
    "Регистрация",
    "Проверьте вашу почту",
  ]

  const BGCards: ('WELCOME' | 'VISIT_EVENTS' | 'FIND_FRIENDS')[] = [
    'WELCOME', 'VISIT_EVENTS', 'FIND_FRIENDS'
  ]

  setBGCardType(BGCards[selectedIndex])
 
  return (
    <>
      <div className="w-[500px] h-[600px] bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
        <p className="text-main-purple text-40 font-bold text-center pb-60">
          { titles[selectedIndex] }
        </p>
        { tabs[selectedIndex] }
        <div className='flex mt-28'>
          <p className='text-neutral-500 text-lg font-normal'>Уже есть аккаунт?&nbsp;</p>
          <Link className="text-neutral-500 hover:text-neutral-950 text-lg font-normal" to={"/login"}>Войти</Link>
        </div>
      </div>
    </>
  );
};

function RegistrationDetailForm({onNext}: any): ReactElement {
  const { form, setForm } = useContext(FormStateContext);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserDataValidationSchema>({
    resolver: zodResolver(userDataSchema),
    defaultValues: form.steps.details.value
  })

  const onSubmit = (data: UserDataValidationSchema) => {
    // TODO: Check email emailRef.current?.value
    console.log(data);
    setForm(
      produce((state) => {
        state.steps.details.value = {
          username: data.username,
          email: data.email
        }
      })
    )
    onNext();
  }


  return (
    <>
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
    </>
  )
}

function RegistrationPasswordForm({onComplete, onPrev}: any): ReactElement {
  const { form, setForm } = useContext(FormStateContext);

  const {
    getValues,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PasswordValidationSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: form.steps.password.value
  })

  const dispatch = useAppDispatch();
  const regUser = () => {
    console.log(`Register with ${form.steps.details.value.email} and ${getValues().password}`);
    dispatch(registerThunk({...form.steps.details.value, password: getValues().password}))
      .unwrap()
      .then(() => onComplete?.())
      .catch((error) => {
        console.log("Registration error ", error.message);
      })
  };

  const onSubmit = (data: UserDataValidationSchema) => {
    console.log(data);
    setForm(
      produce((state) => {
        state.steps.password.value = {
          password: data.password
        };
      })
    );
    regUser();
  }

  return (
    <>
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
    </>
  )
}

function CheckEmailForm(): ReactElement {

  return (
    <>
        <p className='text-neutral-500 text-lg'>Вам на почту было выслано письмо</p>
        <p className='mt-5 text-neutral-500 text-lg'>Для подтверждения личности перейдите по ссылке в письме</p>

    </>
  )
}
