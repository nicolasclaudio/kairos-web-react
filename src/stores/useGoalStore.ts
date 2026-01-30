import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, CreateGoalDTO, UpdateGoalDTO } from '../types/goal';
import { v4 as uuidv4 } from 'uuid';

interface GoalState {
    goals: Goal[];
    isLoading: boolean;
    error: string | null;

    // Actions
    addGoal: (goal: CreateGoalDTO) => void;
    updateGoal: (id: string, updates: UpdateGoalDTO) => void;
    deleteGoal: (id: string) => void;
    getGoal: (id: string) => Goal | undefined;
}

export const useGoalStore = create<GoalState>()(
    persist(
        (set, get) => ({
            goals: [],
            isLoading: false,
            error: null,

            addGoal: (goalDto) => set((state) => {
                const newGoal: Goal = {
                    id: uuidv4(),
                    ...goalDto,
                    status: 'IN_PROGRESS',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    currentValue: goalDto.currentValue || 0
                };
                return { goals: [...state.goals, newGoal] };
            }),

            updateGoal: (id, updates) => set((state) => ({
                goals: state.goals.map((g) =>
                    g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g
                )
            })),

            deleteGoal: (id) => set((state) => ({
                goals: state.goals.filter((g) => g.id !== id)
            })),

            getGoal: (id) => get().goals.find((g) => g.id === id)
        }),
        {
            name: 'kairos-goal-storage',
            partialize: (state) => ({ goals: state.goals }),
        }
    )
);
