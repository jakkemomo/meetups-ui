import {UseFormRegisterReturn} from "react-hook-form";

interface ILargeTextInputProps {
  value?: string;
  placeholder?: string;
  extraBoxClass?: string;
  extraTextAreaClass?: string;
  defaultValue?: string;
  error?: any;
  id?: string;
  labelText?: string;
  hookFormValues?: UseFormRegisterReturn<string>;
}

export function LargeTextInput({ value, placeholder, extraBoxClass, extraTextAreaClass, defaultValue, error, id, labelText, hookFormValues }: ILargeTextInputProps) {
  return (
    <div className={`flex flex-col ${extraBoxClass}`}>
      {labelText && (
        <label htmlFor={id} className={`text-xl text-text-black`}>{labelText}</label>
      )}
      <textarea
        {...hookFormValues}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        className={`text-[18px] font-light min-h-[150px] rounded-[10px] px-[25px] pt-3 mt-[7px] outline-none text-text-black bg-custom-gray placeholder:text-text-light-gray ${extraTextAreaClass}`}
        id={id}
      />
    </div>
  )
}
