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
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    openDrawer: (id?: string) => void;
    closeDrawer: () => void;
    addToDailyPlan: (id: string, priority?: number) => void;
    removeFromDailyPlan: (id: string) => void;
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

                addToDailyPlan: (id: string, priority?: number) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id
                            ? {
                                ...task,
                                plannedAt: new Date().toISOString().split('T')[0],
                                focusPriority: priority,
                                updatedAt: new Date()
                            }
                            : task
                    )
                })),

                removeFromDailyPlan: (id: string) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id
                            ? {
                                ...task,
                                plannedAt: undefined,
                                focusPriority: undefined,
                                updatedAt: new Date()
                            }
                            : task
                    )
                })),

                addTask: (title: string) => set((state) => {
                    const newTask: Task = {
                        id: crypto.randomUUID(),
                        title,
                        status: 'TODO',
                        priority: 'MEDIUM',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        tags: []
                    };
                    return { tasks: [newTask, ...state.tasks] };
                }),

                toggleTask: (id: string) => set((state) => ({
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

                deleteTask: (id: string) => set((state) => ({
                    tasks: state.tasks.filter(task => task.id !== id),
                    selectedTaskId: state.selectedTaskId === id ? null : state.selectedTaskId,
                    isDrawerOpen: state.selectedTaskId === id ? false : state.isDrawerOpen,
                })),

                updateTask: (id: string, updates: Partial<Task>) => set((state) => ({
                    tasks: state.tasks.map(task =>
                        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
                    )
                })),

                openDrawer: (id?: string) => set({ selectedTaskId: id || null, isDrawerOpen: true }),
                closeDrawer: () => set({ isDrawerOpen: false, selectedTaskId: null }),
            }),
            { name: 'kairos-tasks-storage' }
        )
    )
);
