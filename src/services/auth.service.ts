import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import type { User, LoginDTO, RegisterDTO, AuthResponse, ApiResponse } from '@/types';

export const authService = {
    /**
     * Inicia sesión con email y password
     */
    login: async (credentials: LoginDTO): Promise<AuthResponse> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.LOGIN,
            credentials
        );
        const authData = response.data.data;

        // Guardar token en localStorage
        localStorage.setItem('auth_token', authData.token);

        return authData;
    },

    /**
     * Registra un nuevo usuario
     */
    register: async (userData: RegisterDTO): Promise<AuthResponse> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(
            API_ENDPOINTS.REGISTER,
            userData
        );
        const authData = response.data.data;

        // Guardar token en localStorage
        localStorage.setItem('auth_token', authData.token);

        return authData;
    },

    /**
     * Cierra sesión del usuario actual
     */
    logout: async (): Promise<void> => {
        try {
            await apiClient.post(API_ENDPOINTS.LOGOUT);
        } finally {
            // Siempre limpiar el token local
            localStorage.removeItem('auth_token');
        }
    },

    /**
     * Obtiene el usuario actual autenticado
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.ME);
        return response.data.data;
    },

    /**
     * Verifica si hay un token de autenticación
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('auth_token');
    },
};
