import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Task, TaskPriority } from '../types';
import * as tasksApi from '../services/api/tasks';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchTasks: () => Promise<void>;
    addTask: (title: string, priority?: TaskPriority) => Promise<void>;
    toggleTask: (id: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    clearCompleted: () => Promise<void>;
}

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            (set, get) => ({
                tasks: [],
                isLoading: false,
                error: null,

                fetchTasks: async () => {
                    set({ isLoading: true, error: null });
                    try {
                        const tasks = await tasksApi.getTasks();
                        set({ tasks, isLoading: false });
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to fetch tasks',
                            isLoading: false
                        });
                    }
                },

                addTask: async (title: string, priority: TaskPriority = 'MEDIUM') => {
                    set({ isLoading: true, error: null });
                    try {
                        const newTask = await tasksApi.createTask({
                            title,
                            priority,
                            metaScore: priority === 'HIGH' ? 8 : priority === 'MEDIUM' ? 5 : 3,
                            estimatedMinutes: 30,
                        });

                        set((state) => ({
                            tasks: [newTask, ...state.tasks],
                            isLoading: false,
                        }));
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to create task',
                            isLoading: false
                        });
                    }
                },

                toggleTask: async (id: string) => {
                    const task = get().tasks.find((t) => t.id === id);
                    if (!task) return;

                    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

                    try {
                        const updatedTask = await tasksApi.updateTask(id, { status: newStatus });
                        set((state) => ({
                            tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
                        }));
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to update task'
                        });
                    }
                },

                deleteTask: async (id: string) => {
                    try {
                        await tasksApi.deleteTask(id);
                        set((state) => ({
                            tasks: state.tasks.filter((t) => t.id !== id),
                        }));
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to delete task'
                        });
                    }
                },

                updateTask: async (id: string, updates: Partial<Task>) => {
                    try {
                        const updatedTask = await tasksApi.updateTask(id, updates);
                        set((state) => ({
                            tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
                        }));
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to update task'
                        });
                    }
                },

                clearCompleted: async () => {
                    const completedIds = get().tasks
                        .filter((t) => t.status === 'DONE')
                        .map((t) => t.id);

                    try {
                        await Promise.all(completedIds.map((id) => tasksApi.deleteTask(id)));
                        set((state) => ({
                            tasks: state.tasks.filter((t) => t.status !== 'DONE'),
                        }));
                    } catch (error) {
                        set({
                            error: error instanceof Error ? error.message : 'Failed to clear completed tasks'
                        });
                    }
                },
            }),
            {
                name: 'kairos-task-storage',
                partialize: (state) => ({ tasks: state.tasks }),
            }
        )
    )
);
