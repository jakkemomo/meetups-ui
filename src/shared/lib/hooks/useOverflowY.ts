import { useLayoutEffect, useRef, useState } from "react"

interface IOverflowYReturn {
  ref: React.RefObject<HTMLDivElement>
  isOverflowY: boolean
}

interface IOverflowYProps {
  callback?: (hasOverflow: boolean) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[]
}

export const useOverflowY = ({ callback, deps = [] }: IOverflowYProps): IOverflowYReturn => {
  const [isOverflowY, setIsOverflowY] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current } = ref;

    if (current) {
      const hasOverflowY = current.scrollHeight > current.clientHeight;
      setIsOverflowY(hasOverflowY);
      callback?.(hasOverflowY);
    }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react-hooks/exhaustive-deps
  }, [callback, ref, ...deps])

  return { ref, isOverflowY }
}
