import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import type { AnalyticsData, ApiResponse } from '@/types';

export const analyticsService = {
    /**
     * Obtiene todos los analytics del usuario
     */
    getAnalytics: async (): Promise<AnalyticsData> => {
        const response = await apiClient.get<ApiResponse<AnalyticsData>>(
            API_ENDPOINTS.ANALYTICS
        );
        return response.data.data;
    },

    /**
     * Obtiene métrica de velocidad
     */
    getVelocity: async (): Promise<AnalyticsData['velocity']> => {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_VELOCITY);
        return response.data.data;
    },

    /**
     * Obtiene métrica de impacto
     */
    getImpact: async (): Promise<AnalyticsData['impact']> => {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_IMPACT);
        return response.data.data;
    },

    /**
     * Obtiene métrica de racha
     */
    getStreak: async (): Promise<AnalyticsData['streak']> => {
        const response = await apiClient.get(API_ENDPOINTS.ANALYTICS_STREAK);
        return response.data.data;
    },
};
