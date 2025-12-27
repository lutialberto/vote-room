import { useState, useEffect, useRef } from "react";

export function useCountdown() {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && currentValue !== null && currentValue > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev === null || prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentValue]);

  const intervalRef = useRef<number | null>(null);

  const start = (seconds: number) => {
    if (isRunning || currentValue === 0) return;
    if (seconds <= 0)
      throw new Error("Countdown seconds must be greater than zero.");
    setIsRunning(true);
    setCurrentValue(seconds);
  };

  return {
    currentValue,
    isFinished: currentValue === 0,
    isRunning,
    start,
  };
}
