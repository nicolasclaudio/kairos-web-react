import { create } from 'zustand';
import { goalsService } from '../services/goals.service';
import type { Goal, CreateGoalDTO } from '@/types';

interface GoalState {
    goals: Goal[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchGoals: (userId: number) => Promise<void>;
    addGoal: (goal: CreateGoalDTO) => Promise<void>;
    // deleteGoal: (id: string) => Promise<void>; // TODO: Implement in API
    // updateGoal: (id: string, updates: UpdateGoalDTO) => Promise<void>; // TODO: Implement in API
}

export const useGoalStore = create<GoalState>((set) => ({
    goals: [],
    isLoading: false,
    error: null,

    fetchGoals: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const goals = await goalsService.getAll(userId);
            set({ goals, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch goals', isLoading: false });
            console.error(error);
        }
    },

    addGoal: async (goalDto) => {
        set({ isLoading: true, error: null });
        try {
            const newGoal = await goalsService.create(goalDto);
            set((state) => ({ goals: [...state.goals, newGoal], isLoading: false }));
        } catch (error) {
            set({ error: 'Failed to create goal', isLoading: false });
            console.error(error);
        }
    },
}));
