import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimerStore } from './useTimerStore';

describe('useTimerStore', () => {
    beforeEach(() => {
        const { result } = renderHook(() => useTimerStore());
        act(() => {
            result.current.clearActiveSession();
        });
    });

    it('starts a session', () => {
        const { result } = renderHook(() => useTimerStore());

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
        });

        expect(result.current.activeTaskId).toBe('task-1');
        expect(result.current.activeTaskTitle).toBe('Test Task');
        expect(result.current.duration).toBe(1500);
        expect(result.current.isInFocusMode).toBe(true);
    });

    it('ends a session and saves time', () => {
        const { result } = renderHook(() => useTimerStore());

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
        });

        act(() => {
            result.current.endSession(1500);
        });

        expect(result.current.activeTaskId).toBe(null);
        expect(result.current.isInFocusMode).toBe(false);
        expect(result.current.timeSpent['task-1']).toBe(1500);
    });

    it('accumulates time across multiple sessions', () => {
        const { result } = renderHook(() => useTimerStore());

        // Clear any existing time first
        act(() => {
            const currentTime = result.current.timeSpent['task-1'] || 0;
            result.current.clearActiveSession();
        });

        const initialTime = result.current.timeSpent['task-1'] || 0;

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
            result.current.endSession(1500);
        });

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
            result.current.endSession(1500);
        });

        expect(result.current.timeSpent['task-1']).toBe(initialTime + 3000);
    });

    it('toggles focus mode', () => {
        const { result } = renderHook(() => useTimerStore());

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
        });

        expect(result.current.isInFocusMode).toBe(true);

        act(() => {
            result.current.toggleFocusMode();
        });

        expect(result.current.isInFocusMode).toBe(false);

        act(() => {
            result.current.toggleFocusMode();
        });

        expect(result.current.isInFocusMode).toBe(true);
    });

    it('adds time to task manually', () => {
        const { result } = renderHook(() => useTimerStore());

        act(() => {
            result.current.addTimeToTask('task-2', 600);
        });

        expect(result.current.timeSpent['task-2']).toBe(600);

        act(() => {
            result.current.addTimeToTask('task-2', 300);
        });

        expect(result.current.timeSpent['task-2']).toBe(900);
    });

    it('clears active session', () => {
        const { result } = renderHook(() => useTimerStore());

        act(() => {
            result.current.startSession('task-1', 'Test Task', 1500);
        });

        act(() => {
            result.current.clearActiveSession();
        });

        expect(result.current.activeTaskId).toBe(null);
        expect(result.current.activeTaskTitle).toBe(null);
        expect(result.current.isInFocusMode).toBe(false);
    });
});
