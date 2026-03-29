/* eslint-disable @typescript-eslint/no-explicit-any */
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number) {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      const runTimer = () => {
        timeoutId = setTimeout(() => {
          if (lastArgs) {
            func.apply(this, lastArgs);
            lastArgs = null;
            runTimer();
          } else {
            inThrottle = false;
            timeoutId = null;
          }
        }, limit);
      };

      runTimer();
    } else {
      lastArgs = args;
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttled;
}
