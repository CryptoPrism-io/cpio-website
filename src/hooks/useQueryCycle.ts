import { useState, useEffect, useCallback, useRef } from 'react';

const CYCLE_INTERVAL_MS = 5000;
const LEVEL_COUNT = 3;

export function useQueryCycle() {
  const [activeLevel, setActiveLevel] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveLevel((prev) => (prev + 1) % LEVEL_COUNT);
    }, CYCLE_INTERVAL_MS);
  }, []);

  const handleClick = useCallback((levelIndex: number) => {
    setActiveLevel(levelIndex);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return { activeLevel, handleClick };
}
