# Store

Estado global de la aplicación usando Zustand.

## Why Zustand?

- Más ligero que Redux
- API simple y directa
- Excelente TypeScript support
- No requiere providers
- Fácil integración con devtools

## Estructura

```
store/
├── useAuthStore.ts
├── useTasksStore.ts
├── useTimerStore.ts
└── usePreferencesStore.ts
```

## Ejemplo

```tsx
// useTasksStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Task } from '@/types';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
}

export const useTasksStore = create<TasksState>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        isLoading: false,
        error: null,

        setTasks: (tasks) => set({ tasks }),
        
        addTask: (task) => set((state) => ({ 
          tasks: [...state.tasks, task] 
        })),
        
        updateTask: (id, updates) => set((state) => ({
          tasks: state.tasks.map(task => 
            task.id === id ? { ...task, ...updates } : task
          )
        })),
        
        deleteTask: (id) => set((state) => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
        
        toggleTaskComplete: (id) => set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        })),
      }),
      { name: 'tasks-storage' }
    )
  )
);

// Uso en componentes
// const { tasks, addTask } = useTasksStore();
```
