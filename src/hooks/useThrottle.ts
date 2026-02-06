import { useRef } from "react";

export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
): T {
  const lastCall = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(
        () => {
          lastCall.current = Date.now();
          callback(...args);
          timeoutRef.current = null;
        },
        delay - (now - lastCall.current)
      );
    }
  };

  return throttled as T;
}
