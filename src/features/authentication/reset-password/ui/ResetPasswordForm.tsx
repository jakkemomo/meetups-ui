import {useLocation} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {Step, TABS} from "@/features/authentication/reset-password/model/step";
import {BackgroundCard} from "@/shared/ui";

interface LocationState {
  activeStep: Step;
}

export const ResetPasswordForm = () => {
  const methods = useForm();
  const location = useLocation();

  if (!location.state) {
    location.state = { activeStep: Step.ENTER_EMAIL }
  }
  const state = location.state as LocationState;
  const step = TABS[state.activeStep];

  return (
    <>
      <FormProvider {...methods}>
        <step.component />
      </FormProvider>
      <BackgroundCard cardType={step.backgroundType} />
    </>
  )
}
