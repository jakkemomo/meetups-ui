import {RegisterMultiStepForm} from "@/features/authentication/registration";
import {selectBGCard} from "@/features/authentication/registration/model/formState";
import {useAppSelector} from "@/shared/model";
import {BackgroundCard} from "@/shared";
import {ReactElement} from "react";


export default function RegistrationPage(): ReactElement {
  const bgCardType = useAppSelector(selectBGCard)

  return (
    <section className="bg-transparent-gray w-full h-full relative flex items-center justify-center">
      <RegisterMultiStepForm />
      <BackgroundCard cardType={bgCardType} />
    </section>
  )
}
