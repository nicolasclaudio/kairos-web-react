import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * Configuración del QueryClient para React Query
 */
const queryConfig: DefaultOptions = {
    queries: {
        // Tiempo que los datos se consideran frescos (5 minutos)
        staleTime: 5 * 60 * 1000,

        // Tiempo que los datos permanecen en cache (10 minutos)
        gcTime: 10 * 60 * 1000,

        // Reintentar 1 vez en caso de fallo
        retry: 1,

        // No refetch automáticamente al enfocar la ventana en desarrollo
        refetchOnWindowFocus: false,

        // Refetch al reconectar a internet
        refetchOnReconnect: true,
    },
    mutations: {
        // Configuración global de mutaciones
        retry: false,
    },
};

export const queryClient = new QueryClient({
    defaultOptions: queryConfig,
});

/**
 * Query keys para organizar las queries
 */
export const queryKeys = {
    // Auth
    currentUser: ['auth', 'me'] as const,

    // Tasks
    tasks: {
        all: ['tasks'] as const,
        lists: () => [...queryKeys.tasks.all, 'list'] as const,
        list: (filters?: unknown) => [...queryKeys.tasks.lists(), { filters }] as const,
        details: () => [...queryKeys.tasks.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.tasks.details(), id] as const,
    },

    // Projects
    projects: {
        all: ['projects'] as const,
        lists: () => [...queryKeys.projects.all, 'list'] as const,
        details: () => [...queryKeys.projects.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.projects.details(), id] as const,
    },

    // Analytics
    analytics: {
        all: ['analytics'] as const,
        velocity: () => [...queryKeys.analytics.all, 'velocity'] as const,
        impact: () => [...queryKeys.analytics.all, 'impact'] as const,
        streak: () => [...queryKeys.analytics.all, 'streak'] as const,
    },
} as const;
