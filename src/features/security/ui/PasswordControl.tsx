import { Button, PasswordInput } from "@/shared";
import { Disclosure, Transition } from "@headlessui/react";
import { ReactElement, useId } from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordValidationSchema, changePasswordSchema } from "../model/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "../api/securityApi";
import { useAppDispatch } from "@/shared/model";
import { securityPopupSetted } from "../model/securityPopupSlice";

function PasswordControl(): ReactElement {
  const dispatch = useAppDispatch();
  const passwordId = useId();
  const repeatPasswordId = useId();
  const repeatOldPasswordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
    setError
  } = useForm<ChangePasswordValidationSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur'
  })

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async ({ password, old_password }: ChangePasswordValidationSchema) => {
    await changePassword({ password, old_password })
      .unwrap()
      .then(() => {
        reset();
        dispatch(securityPopupSetted({ isOpen: true, popupType: 'password' }));
      })
  }

  return (
    <Disclosure>
      {({ open, close }) => (
        <form onSubmit={(data) => {
          handleSubmit(onSubmit)(data)
            .then(() => close())
            .catch(() => setError('old_password', { message: 'Не верный пароль'}))
        }} className="flex flex-col items-start min-w-[480px]">
        <Disclosure.Button as="div">
          <Button
            type="button"
            extraClass={`text-[18px] font-semibold ${open ? "text-text-disable" : "text-but-primary"}`}
          >Сменить пароль</Button>
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
            <label htmlFor={repeatOldPasswordId} className="text-[20px] cursor-pointer">Старый пароль</label>
            <PasswordInput
              hookFormRegister={register('old_password')}
              isError={!!errors.old_password}
              id={repeatOldPasswordId}
              size="lg"
              className="w-[480px] mt-[7px] text-[18px]"
              placeholder="Введите старый пароль"
            />
            <label htmlFor={passwordId} className="text-[20px] mt-5 inline-block cursor-pointer">Новый пароль</label>
            <PasswordInput
              hookFormRegister={register('password')}
              isError={!!errors.password}
              id={passwordId}
              size="lg"
              className="w-[480px] mt-[7px] text-[18px]"
              placeholder="Введите новый пароль"
            />
            <label htmlFor={repeatPasswordId} className="text-[20px] mt-5 inline-block cursor-pointer">Повторите новый пароль</label>
            <PasswordInput
              isError={!!errors.repeat_password}
              hookFormRegister={register('repeat_password')}
              id={repeatPasswordId}
              size="lg"
              className="w-[480px] mt-[7px] text-[18px]"
              placeholder="Введите повторно новый пароль"
            />
            <Button
              type="submit"
              size="sm"
              importance="primary"
              extraClass="mt-5"
              disabled={(!isValid && isSubmitted) || isLoading}
            >Подтвердить</Button>
          </Disclosure.Panel>
        </Transition>
      </form>
      )}
    </Disclosure>
  )
}

export default PasswordControl;
