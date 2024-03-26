import { ChangeEvent, ReactElement } from "react";

interface ICheckboxWithValueProps {
  id: string;
  value: string;
  onChangeFunc?: (e: ChangeEvent<HTMLInputElement>) => void;
  extraBoxClass?: string;
  extraLabelClass?: string;
}

export function CheckboxWithValue({ id, value, onChangeFunc, extraBoxClass, extraLabelClass }: ICheckboxWithValueProps): ReactElement {
  return (
    <div className={`flex items-center ${extraBoxClass}`}>
      <input id={id} onChange={onChangeFunc} type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none rounded-[5px] border-2 border-text-black bg-center bg-no-repeat checked:bg-check" />
      <label htmlFor={id} className={`text-[18px] cursor-pointer ${extraLabelClass}`}>{value}</label>
    </div>
  )
}
