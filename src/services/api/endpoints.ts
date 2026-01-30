export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',

    // Tasks
    TASKS: '/tasks',
    TASK_BY_ID: (id: string) => `/tasks/${id}`,
    TASK_COMPLETE: (id: string) => `/tasks/${id}/complete`,

    // Projects
    PROJECTS: '/projects',
    PROJECT_BY_ID: (id: string) => `/projects/${id}`,

    // Analytics
    ANALYTICS: '/analytics',
    ANALYTICS_VELOCITY: '/analytics/velocity',
    ANALYTICS_IMPACT: '/analytics/impact',
    ANALYTICS_STREAK: '/analytics/streak',
} as const;
