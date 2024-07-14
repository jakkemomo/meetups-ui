import { FieldError } from "react-hook-form";

interface IInputErrorMessageProps {
  error?: FieldError;
}

export function InputErrorMessage({ error }: IInputErrorMessageProps) {

  return (
    <div className={`flex mt-2 ${error ? 'opacity-100' : 'opacity-0'}`}>
      <img src='/images/error-alert.svg' alt="Ошибка" className='pr-3'/>
      <span role='alert' className='text-input-error text-base'>
        {error?.message}
      </span>
    </div>
  )
}
