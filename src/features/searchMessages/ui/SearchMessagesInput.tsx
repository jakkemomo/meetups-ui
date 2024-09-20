// SearchMessagesInput.tsx
import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Svg from "@/shared/ui/Svg";
import { setSearchMessages } from "../model/SearchMessagesSlice";

export function SearchMessagesInput() {
  const [searchValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue] = useDebounce(searchValue, 700);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("Dispatching search value:", debouncedValue);
    dispatch(setSearchMessages(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <Input
      type="search"
      value={searchValue}
      placeholder="Ищите в диалоге"
      head={<Svg id="search-icon-def" className="w-6 h-6" />}
      className="!bg-transparent ml-auto mb-2 max-w-[200px]"
      extraInputClass="pl-[8px] placeholder:!text-placeholder-gray"
      onChange={handleInputChange}
    />
  );
}
