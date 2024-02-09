import { ReactElement } from "react"
import { useAppSelector } from "@/shared/model";
import { selectTabId } from "../model/formState";
import { DetailForm } from "./DetailForm";
import { PasswordForm } from "./PasswordForm";
import { CheckEmail } from "./CheckEmail";
import {FormWrapper} from "@/shared/ui";


export function RegisterMultiStepForm(): ReactElement {
  const selectedIndex = useAppSelector(selectTabId);

  const tabs = [
    <DetailForm/>,
    <PasswordForm/>,
    <CheckEmail/>
  ];

  const titles = [
    "Регистрация",
    "Регистрация",
    "Проверьте вашу почту",
  ]

  return (
    <FormWrapper redirectType='login' headerText={titles[selectedIndex]}>
      { tabs[selectedIndex] }
    </FormWrapper>
  );
};
