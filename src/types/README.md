# Types

Definiciones de TypeScript para toda la aplicación.

## Convenciones

- Usar `interface` para tipos que pueden extenderse
- Usar `type` para uniones, intersecciones y tipos complejos
- Exportar todos los tipos
- Un archivo por dominio (task.ts, user.ts, project.ts)

## Estructura

```
types/
├── index.ts          # Re-exporta todos los tipos
├── task.ts           # Tipos relacionados con tareas
├── user.ts           # Tipos de usuario y autenticación
├── project.ts        # Tipos de proyectos
├── analytics.ts      # Tipos para analytics y estadísticas
└── common.ts         # Tipos comunes y utilitarios
```

## Ejemplo

```tsx
// task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  metaScore?: number;
  estimatedMinutes?: number;
  actualMinutes?: number;
  dueDate?: Date;
  completedAt?: Date;
  projectId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: TaskPriority;
  estimatedMinutes?: number;
  dueDate?: Date;
  projectId?: string;
  tags?: string[];
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  status?: TaskStatus;
}

// user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'es';
  notifications: boolean;
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
}

// index.ts
export * from './task';
export * from './user';
export * from './project';
export * from './analytics';
export * from './common';
```
