import { useLayoutEffect, useRef, useState } from "react"

interface OverflowY {
  ref: React.RefObject<HTMLDivElement>
  isOverflowY: boolean
}

export const useOverflowY = (
  callback?: (hasOverflow: boolean) => void
): OverflowY => {
  const [isOverflowY, setIsOverflowY] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current } = ref;

    if (current) {
      const hasOverflowY = current.scrollHeight > current.clientHeight;
      setIsOverflowY(hasOverflowY);
      callback?.(hasOverflowY);
    }
  }, [callback, ref])

  return { ref, isOverflowY }
}
