import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Task } from '@/types';

interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    selectedTaskId: string | null;
    isDrawerOpen: boolean;

    // Actions
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string) => void;
    openDrawer: (taskId: string) => void;
    closeDrawer: () => void;
}

export const useTasksStore = create<TasksState>()(
    devtools(
        persist(
            (set) => ({
                tasks: [],
                isLoading: false,
                error: null,
                selectedTaskId: null,
                isDrawerOpen: false,

                setTasks: (tasks) => set({ tasks }),

                addTask: (task) => set((state) => ({
                    tasks: [task, ...state.tasks]  // Add to beginning for newest first
                })),

                updateTask: (id, updates) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
                    )
                })),

                deleteTask: (id) => set((state) => ({
                    tasks: state.tasks.filter(task => task.id !== id),
                    selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
                    isDrawerOpen: state.selectedTaskId === id ? false : state.isDrawerOpen,
                })),

                toggleTaskComplete: (id) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id
                            ? {
                                ...task,
                                status: task.status === 'DONE' ? 'TODO' : 'DONE',
                                completedAt: task.status === 'DONE' ? undefined : new Date(),
                                updatedAt: new Date()
                            }
                            : task
                    )
                })),

                openDrawer: (taskId) => set({ selectedTaskId: taskId, isDrawerOpen: true }),
                closeDrawer: () => set({ isDrawerOpen: false }),
            }),
            { name: 'kairos-tasks-storage' }
        )
    )
);
