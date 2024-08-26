import {UseFormRegisterReturn} from "react-hook-form";

interface ILargeTextInputProps {
  value?: string;
  placeholder?: string;
  extraBoxClass?: string;
  extraTextAreaClass?: string;
  defaultValue?: string;
  error?: string;
  id?: string;
  labelText?: string;
  hookFormValues?: UseFormRegisterReturn<string>;
  maxLength?: number;
}

export function LargeTextInput({ value, placeholder, extraBoxClass, extraTextAreaClass, defaultValue, error, id, labelText, hookFormValues, maxLength }: ILargeTextInputProps) {
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
        className={`text-[17px] min-h-[150px] rounded-[10px] px-[25px] pt-3 mt-[7px] outline-none text-text-black bg-secondary-100 placeholder:text-secondary-600 ${extraTextAreaClass} ${error ? "border-1 border-solid border-system-500" : ""}`}
        id={id}
        maxLength={maxLength}
      />
    </div>
  )
}
