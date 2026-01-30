import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasksStore } from './useTasksStore';
import type { Task } from '@/types';

describe('useTasksStore', () => {
    beforeEach(() => {
        // Reset store before each test
        const { result } = renderHook(() => useTasksStore());
        act(() => {
            result.current.setTasks([]);
        });
    });

    it('adds a task to the store', () => {
        const { result } = renderHook(() => useTasksStore());

        const newTask: Task = {
            id: '1',
            title: 'Test Task',
            status: 'TODO',
            priority: 'MEDIUM',
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        act(() => {
            result.current.addTask(newTask);
        });

        expect(result.current.tasks).toHaveLength(1);
        expect(result.current.tasks[0].title).toBe('Test Task');
    });

    it('toggles task completion', () => {
        const { result } = renderHook(() => useTasksStore());

        const task: Task = {
            id: '1',
            title: 'Test Task',
            status: 'TODO',
            priority: 'MEDIUM',
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        act(() => {
            result.current.addTask(task);
        });

        act(() => {
            result.current.toggleTaskComplete('1');
        });

        expect(result.current.tasks[0].status).toBe('DONE');
        expect(result.current.tasks[0].completedAt).toBeDefined();
    });

    it('deletes a task', () => {
        const { result } = renderHook(() => useTasksStore());

        const task: Task = {
            id: '1',
            title: 'Test Task',
            status: 'TODO',
            priority: 'MEDIUM',
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        act(() => {
            result.current.addTask(task);
        });

        expect(result.current.tasks).toHaveLength(1);

        act(() => {
            result.current.deleteTask('1');
        });

        expect(result.current.tasks).toHaveLength(0);
    });

    it('opens and closes drawer', () => {
        const { result } = renderHook(() => useTasksStore());

        act(() => {
            result.current.openDrawer('task-1');
        });

        expect(result.current.isDrawerOpen).toBe(true);
        expect(result.current.selectedTaskId).toBe('task-1');

        act(() => {
            result.current.closeDrawer();
        });

        expect(result.current.isDrawerOpen).toBe(false);
    });
});
