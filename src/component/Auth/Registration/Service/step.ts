import { FC } from "react";
import MailAndPassordStep from "../Step/MailAndPassordStep";
import OTPStep from "../Step/OTPStep";
import CreateLoginStep from "../Step/CreateLoginStep";
import Review from "../Step/Review";


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