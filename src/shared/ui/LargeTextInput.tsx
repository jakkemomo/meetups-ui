import {UseFormRegisterReturn} from "react-hook-form";

interface ILargeTextInputProps {
  value?: string;
  placeholder?: string;
  extraBoxClass?: string;
  extraContentClass?: string;
  defaultValue?: string;
  error?: any;
  id?: string;
  labelText?: string;
  hookFormValues?: UseFormRegisterReturn<string>;
}

export function LargeTextInput({ value, placeholder, extraBoxClass, extraContentClass, defaultValue, error, id, labelText, hookFormValues }: ILargeTextInputProps) {

  return (
    <div>
      {labelText && (
        <label htmlFor={id} className={`text-xl text-text-black`}>{labelText}</label>
      )}
      <div className={`bg-custom-gray rounded-[10px] border min-w-full md:w-80 ${extraBoxClass} ${error ? 'border-input-error' : 'border-transparent'}`}>
        <div className={`flex items-center h-[150px] w-full overflow-hidden p-3.5 ${extraContentClass}`}>
          <textarea
            {...hookFormValues}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-invalid={error ? 'true' : 'false'}
            className={`h-full w-full outline-none text-text-black bg-inherit px-3 font-normal placeholder:text-text-light-gray text-base md:text-lg`}
            id={id}
          />
        </div>
      </div>
    </div>
  )
}
