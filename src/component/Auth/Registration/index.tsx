import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { clearFormData } from "./Service/seveAndGetData";
import { Step, TABS } from "./Service/step";
import { FormProvider, useForm } from "react-hook-form";
import TitleForm from "../UI/TitleForm.tsx";
import FormContainer from "../UI/FormContainer";

const Registration = () => {
  const methods = useForm()

  const locate = useLocation()
  console.log('Registration locate: ', locate);
  let { state } = useLocation()

  if (!state) {
      state = { activeStep: Step.MAIL_AND_PASSWORD }
  }

  const step = TABS[state.activeStep]

  /* очистка данных в сессион стор при переходе на другую страницу */
  useEffect(() => {
      return () => {
          clearFormData();
      };
  }, []);

  return (
      <FormContainer>
          <>
              <TitleForm title={step.title} />
              <FormProvider {...methods}>
                  <step.component />
              </FormProvider>
          </>
      </FormContainer>
  )
}

export default Registration
