import { ChangeEvent, ReactElement } from "react";

interface ICheckboxWithValueProps {
  id: string;
  value: string;
  onChangeFunc?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CheckboxWithValue({ id, value, onChangeFunc }: ICheckboxWithValueProps): ReactElement {
  return (
    <div className="flex items-center mt-3">
      <input id={id} onChange={onChangeFunc} type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none rounded-[4px] border-2 border-black bg-center bg-no-repeat checked:bg-check" />
      <label htmlFor={id} className="text-[18px] ml-2.5 cursor-pointer">{value}</label>
    </div>
  )
}
