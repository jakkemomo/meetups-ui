import { IInputProps, Input } from "@/shared/ui/Inputs/Input";
import { ReactElement, useId } from "react";
import cx from 'classnames';

interface ILabeledInputProps extends IInputProps {
  extraLabelClass?: string;
  labelText: string;
  extraBoxClass?: string;
  id?: string;
  errorMessage?: string;
  extraErrorClass?: string;
}

export function LabeledInput({
  extraLabelClass,
  labelText,
  extraBoxClass,
  id,
  errorMessage,
  extraErrorClass,
  ...rest
}: ILabeledInputProps): ReactElement {
  const autoId = useId();

  return (
    <div className={
      cx(
        'flex flex-col items-start',
        extraBoxClass
      )
    }>
      <label
        htmlFor={id ? id : autoId}
        className={
        cx(
          'cursor-pointer',
          extraLabelClass
        )
      }>{labelText}</label>
      <Input
        id={id ? id : autoId}
        {...rest}
      />
      {
        errorMessage && (
          <p className={`text-input-error leading-[20px] mt-[7px] ${extraErrorClass}`}>{errorMessage}</p>
        )
      }
    </div>
  )
}
