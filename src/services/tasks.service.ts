import { apiClient } from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import type {
    Task,
    CreateTaskDTO,
    UpdateTaskDTO,
    TaskFilters,
    ApiResponse
} from '@/types';

export const tasksService = {
    /**
     * Obtiene todas las tareas con filtros opcionales
     */
    getAll: async (filters?: TaskFilters): Promise<Task[]> => {
        const response = await apiClient.get<ApiResponse<Task[]>>(
            API_ENDPOINTS.TASKS,
            { params: filters }
        );
        return response.data.data;
    },

    /**
     * Obtiene todas las tareas asociadas a un objetivo
     */
    getByGoalId: async (goalId: string | number): Promise<{ tasks: Task[], totalMinutes: number }> => {
        const response = await apiClient.get<{ tasks: Task[], totalMinutes: number }>(
            API_ENDPOINTS.TASKS_BY_GOAL(goalId)
        );
        return response.data;
    },

    /**
     * Obtiene una tarea por ID
     */
    getById: async (id: string): Promise<Task> => {
        const response = await apiClient.get<ApiResponse<Task>>(
            API_ENDPOINTS.TASK_BY_ID(id)
        );
        return response.data.data;
    },

    /**
     * Crea una nueva tarea
     */
    create: async (task: CreateTaskDTO): Promise<Task> => {
        const response = await apiClient.post<ApiResponse<Task>>(
            API_ENDPOINTS.TASKS,
            task
        );
        return response.data.data;
    },

    /**
     * Actualiza una tarea existente
     */
    update: async (id: string, updates: UpdateTaskDTO): Promise<Task> => {
        const response = await apiClient.put<ApiResponse<Task>>(
            API_ENDPOINTS.TASK_BY_ID(id),
            updates
        );
        return response.data.data;
    },

    /**
     * Elimina una tarea
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(API_ENDPOINTS.TASK_BY_ID(id));
    },

    /**
     * Marca una tarea como completada
     */
    markAsComplete: async (id: string): Promise<Task> => {
        const response = await apiClient.post<ApiResponse<Task>>(
            API_ENDPOINTS.TASK_COMPLETE(id)
        );
        return response.data.data;
    },
};
