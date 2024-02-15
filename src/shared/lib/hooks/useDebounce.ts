import { DebounceFunctionType } from "@/shared/types";
import { useEffect } from "react";

interface IUseDebounce {
  value: string;
  func: DebounceFunctionType;
  delay: number;
}

export function useDebounce({ value, func, delay }: IUseDebounce) {
  useEffect(() => {
    const timeOut = setTimeout(func, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay, func]);
}
