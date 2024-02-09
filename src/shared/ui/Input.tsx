import {FieldPath, UseFormRegisterReturn} from "react-hook-form";
import {useState} from "react";
import {ILoginFormValues, IRegisterFormValues} from "@/shared/types";
import {useMediaQuery} from "@uidotdev/usehooks";

interface IInputProps {
  onChange?: () => void;
  HTMLType: 'email' | 'text' | 'password';
  iconType?: 'person' | 'mail' | 'password' | 'search-icon-gray';
  value?: string;
  placeholder?: string;
  extraClass?: string;
  defaultValue?: string;
  error?: any;
  hookFormValues?: UseFormRegisterReturn<FieldPath<ILoginFormValues>>;
}

export function Input({ HTMLType, iconType, placeholder, extraClass, defaultValue, error, hookFormValues }: IInputProps) {
  const [type, setType] = useState<string>(HTMLType);
  const [passwordIcon, setPasswordIcon] = useState<string>('show-password');
  const isMobileDevice = useMediaQuery("only screen and (max-width : 768px)");

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
      <div className={`bg-custom-gray rounded-[10px] border ${isMobileDevice ? 'w-[316px]' : 'w-80'} ${extraClass} ${error ? 'border-input-error' : 'border-transparent'}`}>
        <div className='flex items-center w-full h-48px overflow-hidden p-3.5'>
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
            className={`h-full w-full outline-none text-black bg-inherit px-3 font-normal ${isMobileDevice ? 'text-base' : 'text-lg'}`}
          />
          {(HTMLType === 'password') &&
            <div
              className='min-w-6 h-6 bg-center bg-no-repeat cursor-pointer'
              style={{ backgroundImage: `url("/images/${passwordIcon}.svg")` }}
              onClick={toggleShowPassword}
            />}
        </div>
      </div>
    </>
  )
}
