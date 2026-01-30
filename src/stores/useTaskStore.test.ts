import { act, renderHook } from '@testing-library/react';
import { useTaskStore } from './taskStore';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Task } from '../types';

// Mock API
vi.mock('../services/api/tasks', () => ({
    getTasks: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
}));

// Mock initial state
const initialTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'TODO', priority: 'MEDIUM', tags: [], createdAt: new Date(), updatedAt: new Date() },
    { id: '2', title: 'Task 2', status: 'TODO', priority: 'HIGH', tags: [], createdAt: new Date(), updatedAt: new Date() },
];

describe('useTaskStore Daily Plan', () => {
    beforeEach(() => {
        useTaskStore.setState({ tasks: initialTasks, isLoading: false, error: null });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should add task to daily plan', () => {
        const { result } = renderHook(() => useTaskStore());

        act(() => {
            result.current.addToDailyPlan('1', 1);
        });

        const task = result.current.tasks.find(t => t.id === '1');
        expect(task?.plannedAt).toBeDefined();
        // Check date is today (YYYY-MM-DD)
        expect(task?.plannedAt).toBe(new Date().toISOString().split('T')[0]);
        expect(task?.focusPriority).toBe(1);
    });

    it('should remove task from daily plan', () => {
        const { result } = renderHook(() => useTaskStore());

        // Setup: add then remove
        act(() => {
            result.current.addToDailyPlan('1', 1);
        });

        act(() => {
            result.current.removeFromDailyPlan('1');
        });

        const task = result.current.tasks.find(t => t.id === '1');
        expect(task?.plannedAt).toBeUndefined();
        expect(task?.focusPriority).toBeUndefined();
    });

    it('should clear incomplete tasks at end of day', () => {
        const { result } = renderHook(() => useTaskStore());

        // Setup: one planned task
        act(() => {
            result.current.addToDailyPlan('1', 1);
        });

        act(() => {
            result.current.endOfDay();
        });

        const task = result.current.tasks.find(t => t.id === '1');
        // Because it was not DONE, it should be cleared from plan
        expect(task?.plannedAt).toBeUndefined();
    });

    // TODO: Verify that DONE tasks stay planned? Or maybe archived?
    // Current logic clears ALL planned tasks if endOfDay is called?
    // Let's check logic:
    // tasks.map(t => t.plannedAt ? { ...t, plannedAt: undefined } : t)
    // Yes, currently it clears ALL plan for tomorrow. That's consistent with "Clean slate".
});
