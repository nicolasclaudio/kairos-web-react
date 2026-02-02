import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import type { User } from '@/types';

export interface CreateUserDTO {
    telegramId: string;
    username?: string;
    timezone: string;
    workStartTime: string;
    workEndTime: string;
    initialVelocityMultiplier: number;
}

export const usersService = {
    /**
     * Registra un nuevo usuario en el sistema
     */
    create: async (userData: CreateUserDTO): Promise<User> => {
        const response = await apiClient.post<User>(
            API_ENDPOINTS.USERS,
            userData
        );
        return response.data;
    },
};
