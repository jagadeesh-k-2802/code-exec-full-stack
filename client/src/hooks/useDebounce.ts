import { useRef, useEffect } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction<T> = (...args: T[]) => void;

export function useDebounce<T, Func extends SomeFunction<T>>(
  func: Func,
  delay = 1000
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => func(...args), delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}
