import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('initializes with correct default values', () => {
        const { result } = renderHook(() => useTimer());

        expect(result.current.timeRemaining).toBe(0);
        expect(result.current.isActive).toBe(false);
        expect(result.current.isPaused).toBe(false);
        expect(result.current.isCompleted).toBe(false);
        expect(result.current.progress).toBe(0);
    });

    it('starts timer with given duration', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60); // 1 minute
        });

        expect(result.current.timeRemaining).toBe(60);
        expect(result.current.isActive).toBe(true);
        expect(result.current.isPaused).toBe(false);
    });

    it('counts down correctly', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(10);
        });

        act(() => {
            vi.advanceTimersByTime(3000); // 3 seconds
        });

        expect(result.current.timeRemaining).toBeLessThanOrEqual(7);
        expect(result.current.isActive).toBe(true);
    });

    it('pauses and resumes timer', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            result.current.pauseTimer();
        });

        expect(result.current.isPaused).toBe(true);

        act(() => {
            result.current.resumeTimer();
        });

        expect(result.current.isPaused).toBe(false);
    });

    it('resets timer', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(60);
        });

        act(() => {
            result.current.resetTimer();
        });

        expect(result.current.timeRemaining).toBe(0);
        expect(result.current.isActive).toBe(false);
        expect(result.current.isCompleted).toBe(false);
    });

    it('marks as completed when timer reaches zero', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(2); // 2 seconds
        });

        act(() => {
            vi.advanceTimersByTime(3000); // 3 seconds
        });

        expect(result.current.isCompleted).toBe(true);
        expect(result.current.isActive).toBe(false);
    });

    it('calculates progress correctly', () => {
        const { result } = renderHook(() => useTimer());

        act(() => {
            result.current.startTimer(100);
        });

        act(() => {
            vi.advanceTimersByTime(50000); // 50 seconds
        });

        // Progress should be approximately 50%
        expect(result.current.progress).toBeGreaterThan(45);
        expect(result.current.progress).toBeLessThan(55);
    });
});
