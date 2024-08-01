// SearchUsersInput.tsx
import { Input } from "@/shared";
import { useAppDispatch } from "@/shared/model";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Svg from "@/shared/ui/Svg";
import { setSearchUsers } from "../model/SearchUsersInputSlice";

export function SearchUsersInput() {
  const [usernameValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const [debouncedValue] = useDebounce(usernameValue, 700);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("Dispatching username value:", debouncedValue);
    dispatch(setSearchUsers(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <Input
      type="text"
      head={<Svg className="w-6 h-6" id="search-icon-def" />}
      onChange={handleInputChange}
      placeholder="Ищите людей и организации"
      value={usernameValue}
      size="md"
      className="w-[375px] max-h-11 text-[16px] mt-5"
      extraInputClass="pl-3"
    />
  );
}
