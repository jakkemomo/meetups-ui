import {FC} from "react";
import MailAndPasswordStep from "../Step/MailAndPasswordStep";
import CreateLoginStep from "../Step/CreateLoginStep";
import Review from "../Step/Review";


type TabType = {
    title: string,
    component: FC
}

export const TABS: TabType[] = [
    {
        component: MailAndPasswordStep,
        title: "Create and account",
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
    CREATE_LOGIN,
    REVIEW
}
