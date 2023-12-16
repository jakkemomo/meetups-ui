import { FC } from "react";
import CreateLoginStep from "../UI/Step/CreateLoginStep";
import MailAndPassordStep from "../UI/Step/MailAndPassordStep";
import OTPStep from "../UI/Step/OTPStep";
import Review from "../UI/Step/Review";

type TabType = {
    title: string,
    component: FC
}

export const TABS: TabType[] = [
    {
        component: MailAndPassordStep,
        title: "Create and account",
    },
    {
        component: OTPStep,
        title: "Сode from email",
    },
    {
        component: CreateLoginStep,
        title: "Create login",
    },
    {
        component: Review,
        title: "Review",
    },
];

export enum Step {
    MAIL_AND_PASSWORD,
    OTP,
    CREATE_LOGIN,
    REVIEW
}