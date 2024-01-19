import {FieldPath, UseFormRegisterReturn} from "react-hook-form";
import {useState} from "react";
import {LoginValidationSchema} from "@/features/authentication/login/model/LoginFormSchema";

interface IInputProps {
  onChange?: () => void;
  HTMLType: 'email' | 'text' | 'password';
  iconType?: 'person' | 'mail' | 'password';
  value?: string;
  placeholder?: string;
  extraClass?: string;
  defaultValue?: string;
  error?: any;
  hookFormValues: UseFormRegisterReturn<FieldPath<LoginValidationSchema>>;
}

export function Input({ HTMLType, iconType, placeholder, extraClass, defaultValue, error, hookFormValues }: IInputProps) {
  const [type, setType] = useState(HTMLType);

  const toggleShowPassword = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };


  return (
    <>
      <div className={`w-80 bg-custom-gray rounded-[10px] ${extraClass}`}>
        <div className='flex items-center w-full h-50 overflow-hidden p-3.5'>
          {iconType &&
            <div
              className='w-6 h-6 bg-center bg-no-repeat'
              style={{ backgroundImage: `url("/images/${iconType}.svg")` }}
            />}
          <input
            {...hookFormValues}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className="h-full w-full outline-none text-black bg-custom-gray px-3 text-lg font-normal"
          />
          {(HTMLType === 'password') &&
            <div
              className='w-6 h-6 bg-center bg-no-repeat cursor-pointer'
              style={{ backgroundImage: `url("/images/show.svg")` }}
              onClick={toggleShowPassword}
            />}
        </div>
      </div>
      {error && (
        <span role='alert' className='text-red-600 text-sm'>
        {error?.message}
      </span>
      )}
    </>
  )
}
