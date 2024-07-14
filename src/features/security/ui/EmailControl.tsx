import { Button, LabeledInput } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { Disclosure, Transition } from "@headlessui/react";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { ChangeEmailValidationSchema, changeEmailSchema } from "../model/changeEmailFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeEmailMutation } from "../api/securityApi";
import { useAppDispatch } from "@/shared/model";
import { securityPopupSetted } from "../model/securityPopupSlice";

interface IEmailControlProps {
  email: string;
}

function EmailControl({ email }: IEmailControlProps): ReactElement {
  const dispatch = useAppDispatch();
  const [isEmailChanging, setIsEmailChanging] = useState(false);

  const {
    register,
    formState: { errors, isValid, isSubmitting, isSubmitted },
    handleSubmit,
    setValue,
    setError,
    getValues
  } = useForm<ChangeEmailValidationSchema>({
    resolver: zodResolver(changeEmailSchema),
    mode: 'onBlur',
    defaultValues: {
      oldEmail: email
    }
  });

  const [changeEmail] = useChangeEmailMutation();

  const handleEmailChanging = () => {
    setIsEmailChanging((state) => !state);
  }

  const onSubmit = async (data: ChangeEmailValidationSchema) => {
    await changeEmail(data.email)
      .unwrap()
      .then(() => {
        const email = getValues('email');
        dispatch(securityPopupSetted({ isOpen: true, popupType: 'email', newEmail: email }));
        setValue('oldEmail', email);
        setValue('email', '');
      })
  }

  return (
    <Disclosure>
      {({ close }) => (
        <form onSubmit={(data) => {
          handleSubmit(onSubmit)(data)
            .then(() => {
              close();
              setIsEmailChanging(false);
            })
            .catch(() => setError('email', {message: 'Пользователь с таким email уже существует'}));
        }} className="flex flex-col items-start">
          <LabeledInput
            hookFormRegister={register('oldEmail')}
            labelText="Привязанная почта"
            extraLabelClass="text-[20px]"
            size="lg"
            className="w-[480px] mt-[7px] text-[18px]"
            tail={<Svg className="w-6 h-6" id="email-envelope-icon" />}
            readOnly={true}
            disabled={isEmailChanging}
          />
          <Disclosure.Button onClick={handleEmailChanging} as="div">
            <Button
              type="button"
              extraClass={`mt-5 text-[18px] font-semibold ${isEmailChanging ? "text-text-disable" : "text-but-primary"}`}
            >Привязать другую</Button>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mt-10">
              <LabeledInput
                hookFormRegister={register('email')}
                isError={!!errors.email?.message}
                labelText="Новая почта"
                extraLabelClass="text-[20px]"
                size="lg"
                className="w-[480px] mt-[7px] text-[18px]"
                tail={<Svg className="w-6 h-6" id="email-envelope-icon" />}
                placeholder="Введите новый адрес"
              />
              <Button
                type="submit"
                size="sm"
                importance="primary"
                extraClass="mt-5"
                disabled={(!isValid && isSubmitted) || isSubmitting}
              >Подтвердить
              </Button>
            </Disclosure.Panel>
          </Transition>
        </form>
      )}
    </Disclosure>
  )
}

export default EmailControl;
