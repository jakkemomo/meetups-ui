import { useFormContext } from "react-hook-form"
import { ValueTextField } from "../../Service/seveAndGetData"
import { FC } from "react"

 type Props = {
    inputFor : ValueTextField,
    readOnly? : boolean,
    label : string,
    placeholder : string,
    errorMsg? : string
}

const TextField : FC<Props> = ({inputFor, label, placeholder, errorMsg, readOnly = false}) => {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div>
            <label
                htmlFor={inputFor}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input 
                // type={inputFor}
                {...register(inputFor, 
                    { required: true, minLength: 1 })} 
                name={inputFor} 
                id={inputFor}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder={placeholder}
                readOnly={readOnly} 
            />
            {errors[inputFor]?.type === "required" && (
                <p role="alert">{errorMsg}</p>
            )}
        </div>
    )
}

export default TextField