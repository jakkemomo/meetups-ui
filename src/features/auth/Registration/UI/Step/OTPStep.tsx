import { useFormContext } from 'react-hook-form'
import useOnSubmitForm from '../../Service/onSubmitForm'
import { Step } from '../../Service/step'
import Button from '../Button'
import ParagrafWithRedirect from '../ParagrafWithRedirect'

const OTPStep = () => {
    const { register, handleSubmit } = useFormContext()
    const handler = useOnSubmitForm(Step.CREATE_LOGIN)
    //const [initialValues] = useState(getFormData())

    return (
        <>
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

                <div className="text-center text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email ba**@dipainhouse.com</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handler)} >
                        <div className="flex flex-col space-y-16 text-black	mt-20">
                            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs" >
                                <div className="w-16 h-16 ">
                                    <input {...register("1")} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                </div>
                                <div className="w-16 h-16 ">
                                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                </div>
                                <div className="w-16 h-16 ">
                                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                </div>
                                <div className="w-16 h-16 ">
                                    <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-5">
                               <Button text="Verify Account"/>
                                <ParagrafWithRedirect link="#" text="Didn't recieve code?" linkText="Resend"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default OTPStep