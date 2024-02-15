import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { setFilter } from "../model/GlobalFilterSlice";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

export function InputWithFilter() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();
  useDebounce({ value: inputValue, func: () => dispatch(setFilter(inputValue)), delay: 500 });

  return (
    <div className="flex items-center ml-[225px]">
      <Input HTMLType="text" iconType="search-icon-gray" onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} value={inputValue} extraContentClass="py-[10px] h-[42px]"/>
      <div className="bg-filter-icon w-6 h-6 bg-cover bg-no-repeat bg-center ml-5 cursor-pointer"></div>
    </div>
  );
}
