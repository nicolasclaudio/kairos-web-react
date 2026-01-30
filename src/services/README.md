# Services

Servicios para comunicación con APIs externas y lógica de negocio que no depende de React.

## Estructura

```
services/
├── api/              # Configuración de Axios/Fetch
│   ├── client.ts     # Cliente HTTP configurado
│   └── endpoints.ts  # Definición de endpoints
├── tasks.service.ts  # API calls relacionadas con tasks
├── auth.service.ts   # Autenticación y autorización
└── analytics.service.ts
```

## Ejemplo

```tsx
// api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// tasks.service.ts
import { apiClient } from './api/client';
import type { Task } from '@/types';

export const tasksService = {
  getAll: () => apiClient.get<Task[]>('/tasks'),
  getById: (id: string) => apiClient.get<Task>(`/tasks/${id}`),
  create: (task: Omit<Task, 'id'>) => apiClient.post<Task>('/tasks', task),
  update: (id: string, task: Partial<Task>) => apiClient.put<Task>(`/tasks/${id}`, task),
  delete: (id: string) => apiClient.delete(`/tasks/${id}`),
};
```
