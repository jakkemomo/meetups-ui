interface IInputErrorMessageProps {
  error?: any;
}

export function InputErrorMessage({ error }: IInputErrorMessageProps) {

  return (
    <div className={`flex ${error ? 'opacity-100' : 'opacity-0'}`}>
      <img src='/images/error-alert.svg' alt="Ошибка" className='pr-3'/>
      <span role='alert' className='text-input-error text-base'>
        {error?.message}
      </span>
    </div>
  )
}
