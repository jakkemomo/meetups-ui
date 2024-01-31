import {FieldPath, UseFormRegisterReturn} from "react-hook-form";
import {useState} from "react";
import {ILoginFormValues, IRegisterFormValues} from "@/shared/types";

interface IInputProps {
  onChange?: () => void;
  HTMLType: 'email' | 'text' | 'password';
  iconType?: 'person' | 'mail' | 'password' | 'search-icon-gray';
  value?: string;
  placeholder?: string;
  extraClass?: string;
  defaultValue?: string;
  error?: any;
  hookFormValues?: UseFormRegisterReturn<FieldPath<ILoginFormValues>> | UseFormRegisterReturn<FieldPath<IRegisterFormValues>>;
}

export function Input({ HTMLType, iconType, placeholder, extraClass, defaultValue, error, hookFormValues }: IInputProps) {
  const [type, setType] = useState<string>(HTMLType);
  const [passwordIcon, setPasswordIcon] = useState<string>('show-password');

  const toggleShowPassword = () => {
    if (type === 'password') {
      setType('text');
      setPasswordIcon('hide-password');
    } else {
      setType('password');
      setPasswordIcon('show-password');
    }
  };

  return (
    <>
      <label className={`w-80 bg-custom-gray rounded-[10px] h-50 p-3.5 ${extraClass}`}>
        <div className='flex items-center w-full h-full overflow-hidden'>
          {iconType &&
            <div
              className='min-w-6 h-6 bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url("/images/${iconType}.svg")` }}
            />}
          <input
            {...hookFormValues}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className="h-full w-full outline-none text-black bg-inherit px-3 text-lg font-normal"
          />
          {(HTMLType === 'password') &&
            <div
              className='min-w-6 h-6 bg-center bg-no-repeat cursor-pointer'
              style={{ backgroundImage: `url("/images/${passwordIcon}.svg")` }}
              onClick={toggleShowPassword}
            />}
        </div>
      </label>
      {error && (
        <span role='alert' className='text-red-600 text-sm'>
        {error?.message}
      </span>
      )}
    </>
  )
}
