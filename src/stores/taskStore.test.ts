import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTaskStore } from './taskStore';
import * as tasksApi from '../services/api/tasks';

// Mock dependencies
vi.mock('../services/api/tasks');

describe('taskStore', () => {
    beforeEach(() => {
        useTaskStore.setState({ tasks: [], isLoading: false, error: null });
        vi.clearAllMocks();
    });

    it('adds a task successfully', async () => {
        const mockTask = {
            id: '1',
            title: 'New Task',
            priority: 'MEDIUM',
            status: 'TODO',
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: []
        };

        // @ts-ignore
        tasksApi.createTask.mockResolvedValue(mockTask);

        await useTaskStore.getState().addTask('New Task', 'MEDIUM');

        expect(useTaskStore.getState().tasks).toHaveLength(1);
        expect(useTaskStore.getState().tasks[0]).toEqual(mockTask);
    });

    it('toggles task status', async () => {
        const initialTask = {
            id: '1',
            title: 'Task',
            priority: 'MEDIUM',
            status: 'TODO',
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: []
        };

        useTaskStore.setState({ tasks: [initialTask as any], isLoading: false, error: null });

        const updatedTask = { ...initialTask, status: 'DONE' };
        // @ts-ignore
        tasksApi.updateTask.mockResolvedValue(updatedTask);

        await useTaskStore.getState().toggleTask('1');

        expect(useTaskStore.getState().tasks[0].status).toBe('DONE');
    });

    it('fetches tasks correctly', async () => {
        const mockTasks = [
            { id: '1', title: 'T1', status: 'TODO', priority: 'HIGH', tags: [], createdAt: new Date(), updatedAt: new Date() }
        ];
        // @ts-ignore
        tasksApi.getTasks.mockResolvedValue(mockTasks);

        await useTaskStore.getState().fetchTasks();

        expect(useTaskStore.getState().tasks).toHaveLength(1);
        expect(useTaskStore.getState().tasks[0].title).toBe('T1');
    });
});
