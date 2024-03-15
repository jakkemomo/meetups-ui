import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { setSearchFilter } from "../model/SearchFilterSlice";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { isPopupOpenSetted } from "../model/filterPopupSlice";

export function InputWithFilter() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  useDebounce({ value: inputValue, func: () => dispatch(setSearchFilter(inputValue)), delay: 500 });

  return (
    <div className="flex items-center ml-[235px]">
      <Input
        HTMLType="text"
        iconType="search-icon-gray"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        value={inputValue}
        extraInputClass="px-3 py-[10px]"
        extraContentClass="px-3.5 h-[42px]"
        extraBoxClass="min-w-[375px]"
      />
      <div onClick={() => dispatch(isPopupOpenSetted(true))} className="bg-filter-icon w-6 h-6 bg-cover bg-no-repeat bg-center ml-5 cursor-pointer"></div>
    </div>
  );
}
