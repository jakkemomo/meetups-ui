import CreateLoginStep from "./CreateLoginStep"
import MailAndPassordStep from "./MailAndPassordStep"
import OTPStep from "./OTPStep"
import Review from "./Review"


const TABS = [
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


const Registation = () => {
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <Review />
            </div>
        </div>
    )
}

export default Registation