import { ReactElement } from "react";
import { ISelectorOptions } from "../types";

interface ISelectorProps {
  options: ISelectorOptions[];
  extraClasses?: string;
}

export function Selector({
  options,
  extraClasses
}: ISelectorProps): ReactElement {
  return (
    <div className={`relative after:absolute after:border-transparent after:border-t-black after:border-[9px] after:border-solid after:right-0 after:top-8 after:pointer-events-none ${extraClasses}`}>
      <select className="appearance-none text-[45px] text-text-black font-bold underline outline-none leading-normal pr-8">
        {
          options.map((el, index) => <option key={index} value={el.value}>{el.name}</option>)
        }
      </select>
    </div>
  );
}
