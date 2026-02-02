import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import type { Goal, CreateGoalDTO } from '@/types';

export const goalsService = {
    /**
     * Crea un nuevo objetivo
     */
    create: async (goalData: CreateGoalDTO): Promise<Goal> => {
        const response = await apiClient.post<Goal>(
            API_ENDPOINTS.GOALS,
            goalData
        );
        return response.data;
    },

    /**
     * Obtiene todos los objetivos de un usuario
     */
    getAll: async (userId: number): Promise<Goal[]> => {
        const response = await apiClient.get<Goal[]>(API_ENDPOINTS.GOALS, {
            params: { userId }
        });
        return response.data;
    },

    /**
     * Obtiene un objetivo por ID
     */
    getById: async (id: string | number): Promise<Goal> => {
        const response = await apiClient.get<Goal>(
            API_ENDPOINTS.GOAL_BY_ID(id)
        );
        return response.data;
    },
};
