import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ValueTextField } from "../../Service/seveAndGetData";
import useOnSubmitForm from "../../Service/onSubmitForm";
import { Step } from "../../Service/step";
import useFilledValue from "../../Service/useFilledValue";
import Button from "../Button";
import TextField from "../TextField";
import ParagrafWithRedirect from "../ParagrafWithRedirect";


const MailAndPassordStep: FC = () => {
    const { handleSubmit, setValue } = useFormContext()
    const handler = useOnSubmitForm(Step.OTP)

    useFilledValue(setValue, [ValueTextField.EMAIL])

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handler)}>
            <TextField
                inputFor={ValueTextField.EMAIL}
                label="Your email"
                placeholder="name@company.com"
                errorMsg="Error email"
            />
            <TextField
                inputFor={ValueTextField.PASSWORD1}
                label="Your password"
                placeholder="••••••••"
                errorMsg="Error password"
            />
            <TextField
                inputFor={ValueTextField.PASSWORD2}
                label="Confirm password"
                placeholder="••••••••"
                errorMsg="Error password 2"
            />
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                </div>
                <ParagrafWithRedirect
                    link="#"
                    text="I accept the"
                    linkText="Terms and Conditions"
                />
            </div>

            <Button text="Send"/>
            <ParagrafWithRedirect
                link="#"
                text="Есть аккаунт?"
                linkText="на страницу логина"
            />

        </form>
    )
}

export default MailAndPassordStep