// SearchMessagesInput.tsx
import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Svg from "@/shared/ui/Svg";
import { setSearchChats } from "../model/SearchChatsSlice";

export function SearchChatsInput() {
  const [searchValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue] = useDebounce(searchValue, 700);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("Dispatching search value:", debouncedValue);
    dispatch(setSearchChats(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <Input
      type="search"
      size="lg"
      value={searchValue}
      head={<Svg id="search-icon-def" className="w-6 h-6" />}
      placeholder="Ищите переписки"
      extraInputClass="pl-3 placeholder:!text-placeholder-gray"
      onChange={handleInputChange}
    />
  );
}
