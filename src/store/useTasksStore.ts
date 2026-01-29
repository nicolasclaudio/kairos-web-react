import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Task } from '@/types';

interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
}

export const useTasksStore = create<TasksState>()(
    devtools(
        persist(
            (set) => ({
                tasks: [],
                isLoading: false,
                error: null,

                setTasks: (tasks) => set({ tasks }),

                addTask: (task) => set((state) => ({
                    tasks: [task, ...state.tasks]  // Add to beginning for newest first
                })),

                updateTask: (id, updates) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id ? { ...task, ...updates } : task
                    )
                })),

                deleteTask: (id) => set((state) => ({
                    tasks: state.tasks.filter(task => task.id !== id)
                })),

                toggleTaskComplete: (id) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id
                            ? {
                                ...task,
                                status: task.status === 'DONE' ? 'TODO' : 'DONE',
                                completedAt: task.status === 'DONE' ? undefined : new Date()
                            }
                            : task
                    )
                })),
            }),
            { name: 'kairos-tasks-storage' }
        )
    )
);
