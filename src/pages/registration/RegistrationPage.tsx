
import { RegistrationMultiStepFormContainer } from "@/features/authentication/registration";
import {BackgroundCard} from "@/shared/ui";

import {ReactElement, createContext, useState} from "react";

const BG_CARD_TYPE = "WELCOME"

export default function RegistrationPage(): ReactElement {
  const [bgCardType, setBGCardType] = useState<'WELCOME' | 'VISIT_EVENTS' | 'FIND_FRIENDS'>(BG_CARD_TYPE);

  return (
    <section className="bg-light-gray w-full relative flex items-center justify-center">
      <RegistrationMultiStepFormContainer setBGCardType={setBGCardType}/>
      <BackgroundCard cardType={bgCardType} />
    </section>
  )
}
