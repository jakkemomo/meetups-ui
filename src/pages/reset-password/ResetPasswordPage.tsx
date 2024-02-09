import {BackgroundCard} from "@/shared/ui";
import {ReactElement} from "react";
import {ResetPasswordForm} from "@/features/authentication/reset-password";
import {EnterNewPasswordStep} from "@/features/authentication/reset-password/ui/EnterNewPasswordStep";

interface IResetPasswordPage {
  type: 'ENTER_EMAIL' | 'ENTER_NEW_PASSWORD'
}
export default function ResetPasswordPage({type}: IResetPasswordPage): ReactElement {

  return (
    <section className="bg-transparent-gray w-full relative flex items-center justify-center">
      {(type === 'ENTER_EMAIL') ? (
        <ResetPasswordForm />
        ) : (
        <>
          <EnterNewPasswordStep />
          <BackgroundCard cardType='CREATE_EVENTS' />
        </>
      )}
    </section>
  )
}
