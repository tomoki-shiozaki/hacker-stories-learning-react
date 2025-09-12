import { useEffect, useRef, useState } from "react";
import { logWarn } from "../utils/logger";

const useSemiPersistentState = <T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const isMounted = useRef(false);

  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (e) {
        logWarn(`Failed to parse localStorage value for key "${key}":`, e);
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSemiPersistentState;
