import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDidMountEffect = (func: () => void, deps: any[]) => {
  const [firstMount, setFirstMount] = useState(true);

  useEffect(() => {
    setFirstMount(false);

    if (firstMount) func();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
