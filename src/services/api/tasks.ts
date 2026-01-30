import { apiClient } from './client';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '../../types';

export const getTasks = async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();

    if (filters?.status) {
        filters.status.forEach(s => params.append('status', s));
    }
    if (filters?.priority) {
        filters.priority.forEach(p => params.append('priority', p));
    }
    if (filters?.projectId) {
        params.append('projectId', filters.projectId);
    }
    if (filters?.search) {
        params.append('search', filters.search);
    }

    const response = await apiClient.get<Task[]>(`/tasks?${params.toString()}`);
    return response.data;
};

export const getTask = async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
};

export const createTask = async (data: CreateTaskDTO): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', data);
    return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
};

export const markTaskAsDone = async (id: string): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, { status: 'DONE' });
    return response.data;
};

export const markTaskAsTodo = async (id: string): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, { status: 'TODO' });
    return response.data;
};
