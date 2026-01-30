import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerReturn {
    timeRemaining: number;  // in seconds
    isActive: boolean;
    isPaused: boolean;
    isCompleted: boolean;
    progress: number;  // 0-100
    startTimer: (duration: number) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    resetTimer: () => void;
}

export const useTimer = (): UseTimerReturn => {
    const [duration, setDuration] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const pausedTimeRef = useRef<number>(0);

    const startTimer = useCallback((newDuration: number) => {
        setDuration(newDuration);
        setTimeRemaining(newDuration);
        setIsActive(true);
        setIsPaused(false);
        setIsCompleted(false);
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;
    }, []);

    const pauseTimer = useCallback(() => {
        setIsPaused(true);
        pausedTimeRef.current = Date.now();
    }, []);

    const resumeTimer = useCallback(() => {
        if (isPaused) {
            const pauseDuration = Date.now() - pausedTimeRef.current;
            startTimeRef.current += pauseDuration;
            setIsPaused(false);
        }
    }, [isPaused]);

    const resetTimer = useCallback(() => {
        setTimeRemaining(0);
        setIsActive(false);
        setIsPaused(false);
        setIsCompleted(false);
        setDuration(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isActive && !isPaused) {
            intervalRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                const remaining = Math.max(0, duration - elapsed);

                setTimeRemaining(remaining);

                if (remaining === 0) {
                    setIsCompleted(true);
                    setIsActive(false);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, isPaused, duration]);

    const progress = duration > 0 ? ((duration - timeRemaining) / duration) * 100 : 0;

    return {
        timeRemaining,
        isActive,
        isPaused,
        isCompleted,
        progress,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
    };
};
