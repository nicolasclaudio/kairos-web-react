import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksService } from '@/services/tasks.service';
import { queryKeys } from '@/lib/react-query';
import type { CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '@/types';

/**
 * Hook para obtener todas las tareas con filtros
 */
export function useTasks(filters?: TaskFilters) {
    return useQuery({
        queryKey: queryKeys.tasks.list(filters),
        queryFn: () => tasksService.getAll(filters),
    });
}

/**
 * Hook para obtener una tarea específica
 */
export function useTask(id: string) {
    return useQuery({
        queryKey: queryKeys.tasks.detail(id),
        queryFn: () => tasksService.getById(id),
        enabled: !!id, // Solo ejecutar si hay ID
    });
}

/**
 * Hook para crear una nueva tarea
 */
export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (task: CreateTaskDTO) => tasksService.create(task),
        onSuccess: () => {
            // Invalidar queries de tasks para refetch
            queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
        },
    });
}

/**
 * Hook para actualizar una tarea
 */
export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskDTO }) =>
            tasksService.update(id, updates),
        onSuccess: (updatedTask) => {
            // Actualizar cache de la tarea específica
            queryClient.setQueryData(
                queryKeys.tasks.detail(updatedTask.id),
                updatedTask
            );
            // Invalidar lista de tareas
            queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() });
        },
    });
}

/**
 * Hook para eliminar una tarea
 */
export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => tasksService.delete(id),
        onSuccess: (_, deletedId) => {
            // Remover de cache
            queryClient.removeQueries({ queryKey: queryKeys.tasks.detail(deletedId) });
            // Invalidar lista de tareas
            queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() });
        },
    });
}

/**
 * Hook para marcar tarea como completada
 */
export function useCompleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => tasksService.markAsComplete(id),
        onSuccess: (completedTask) => {
            // Actualizar cache
            queryClient.setQueryData(
                queryKeys.tasks.detail(completedTask.id),
                completedTask
            );
            queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() });
        },
    });
}
