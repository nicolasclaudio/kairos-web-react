import axios, { AxiosError } from 'axios';

// Configuración del cliente HTTP
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Manejo de errores comunes
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        if (error.response?.status === 403) {
            console.error('Access denied');
        }

        if (error.response?.status && error.response.status >= 500) {
            console.error('Server error:', error.message);
        }

        return Promise.reject(error);
    }
);
