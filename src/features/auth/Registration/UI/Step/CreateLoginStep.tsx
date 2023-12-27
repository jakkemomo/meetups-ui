import { useFormContext } from "react-hook-form"
import { ValueTextField } from "../../Service/seveAndGetData"
import Button from "../Button"
import TextField from "../TextField"
import useOnSubmitForm from "../../Service/onSubmitForm"
import { Step } from "../../Service/step"


const CreateLoginStep = () => {
    const { handleSubmit } = useFormContext()

    const handler = useOnSubmitForm(Step.REVIEW)

    return (
        <>
            <div className="text-center text-sm font-medium text-gray-400">
                <p>Any text</p>
            </div>
            <form action="" className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handler)}>
               <TextField inputFor={ValueTextField.LOGIN} label="Your login" placeholder="login"/>
               <Button text="Create an account"/>
            </form>
            
        </>

    )
}

export default CreateLoginStep