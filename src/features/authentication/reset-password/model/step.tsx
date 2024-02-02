import {FC} from "react";
import {EnterEmailStep} from "@/features/authentication/reset-password/ui/EnterEmailStep";
import {CheckEmailStep} from "@/features/authentication/reset-password/ui/CheckEmailStep";

interface TabType {
  backgroundType: 'LOGIN' | 'WELCOME' | 'VISIT_EVENTS' | 'FIND_FRIENDS' | 'CREATE_EVENTS';
  component: FC
}

export const TABS: TabType[] = [
  {
    component: EnterEmailStep,
    backgroundType: "VISIT_EVENTS",
  },
  {
    component: CheckEmailStep,
    backgroundType: "FIND_FRIENDS",
  },
];

export enum Step {
  ENTER_EMAIL,
  CHECK_EMAIL,
}
