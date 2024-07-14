import { ChangeEvent, ReactElement, useState } from "react";

interface ICheckboxWithLabelProps {
  id: string;
  label: string;
  value?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  extraBoxClass?: string;
  extraLabelClass?: string;
}

export function CheckboxWithLabel({ id, label, value, onChange, extraBoxClass, extraLabelClass }: ICheckboxWithLabelProps): ReactElement {
  const [isChecked, setIsChecked] = useState(value ?? false);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);

    onChange && onChange(e);
  }
  
  return (
    <div className={`flex items-center ${extraBoxClass}`}>
      <input id={id} onChange={handleChecked} type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none outline-none rounded-[5px] border-2 border-text-black bg-center bg-no-repeat checked:bg-check" checked={isChecked} />
      <label htmlFor={id} className={`text-[18px] cursor-pointer ${extraLabelClass}`}>{label}</label>
    </div>
  )
}
