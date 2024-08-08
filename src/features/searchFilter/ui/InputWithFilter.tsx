import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { searchFilterSetted } from "../model/SearchFilterSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { isPopupOpenSetted } from "../model/filterPopupSlice";
import { useDebounce } from "use-debounce";
import Svg from "@/shared/ui/Svg";

export function InputWithFilter() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue] = useDebounce(inputValue, 700);

  useEffect(() => {
    dispatch(searchFilterSetted(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div className="flex items-center ml-[235px]">
      <Input
        type="text"
        head={<Svg className="w-6 h-6" id="search-icon-def" />}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        value={inputValue}
        size="lg"
        className="w-[375px] max-h-11 text-[18px]"
        extraInputClass="pl-3"
      />
      <div onClick={() => dispatch(isPopupOpenSetted(true))} className="bg-filter-icon w-6 h-6 bg-cover bg-no-repeat bg-center ml-5 cursor-pointer"></div>
    </div>
  );
}
