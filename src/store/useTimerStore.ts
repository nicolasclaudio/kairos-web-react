import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TimerState {
    activeTaskId: string | null;
    activeTaskTitle: string | null;
    duration: number;  // in seconds
    isInFocusMode: boolean;
    timeSpent: Record<string, number>;  // taskId -> seconds

    // Actions
    startSession: (taskId: string, taskTitle: string, duration: number) => void;
    endSession: (timeSpent: number) => void;
    toggleFocusMode: () => void;
    addTimeToTask: (taskId: string, seconds: number) => void;
    clearActiveSession: () => void;
}

export const useTimerStore = create<TimerState>()(
    devtools(
        persist(
            (set, get) => ({
                activeTaskId: null,
                activeTaskTitle: null,
                duration: 0,
                isInFocusMode: false,
                timeSpent: {},

                startSession: (taskId, taskTitle, duration) => set({
                    activeTaskId: taskId,
                    activeTaskTitle: taskTitle,
                    duration,
                    isInFocusMode: true,
                }),

                endSession: (timeElapsed) => {
                    const { activeTaskId } = get();
                    if (activeTaskId) {
                        set((state) => ({
                            timeSpent: {
                                ...state.timeSpent,
                                [activeTaskId]: (state.timeSpent[activeTaskId] || 0) + timeElapsed,
                            },
                            activeTaskId: null,
                            activeTaskTitle: null,
                            isInFocusMode: false,
                        }));
                    }
                },

                toggleFocusMode: () => set((state) => ({
                    isInFocusMode: !state.isInFocusMode,
                })),

                addTimeToTask: (taskId, seconds) => set((state) => ({
                    timeSpent: {
                        ...state.timeSpent,
                        [taskId]: (state.timeSpent[taskId] || 0) + seconds,
                    },
                })),

                clearActiveSession: () => set({
                    activeTaskId: null,
                    activeTaskTitle: null,
                    isInFocusMode: false,
                }),
            }),
            {
                name: 'kairos-timer-storage',
                partialize: (state) => ({ timeSpent: state.timeSpent }),
            }
        )
    )
);
