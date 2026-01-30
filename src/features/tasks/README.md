# Tasks Feature

Gestión de tareas: lista, kanban, creación, edición y completado.

## Estructura

```
tasks/
├── components/
│   ├── TaskList.tsx
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── KanbanBoard.tsx
│   └── TaskFilters.tsx
├── hooks/
│   ├── useTasks.ts
│   └── useTaskMutations.ts
└── index.ts
```

## Componentes Principales

### TaskList
Vista de lista de tareas con filtros y ordenamiento.

### KanbanBoard
Vista kanban drag-and-drop para organizar tareas por estado.

### TaskForm
Formulario para crear/editar tareas con validación.

### TaskCard
Card individual de tarea con acciones rápidas.

## Hooks

### useTasks
```tsx
// Obtiene tareas del store y servicios
export const useTasks = (filters?: TaskFilters) => {
  const { tasks, isLoading } = useTasksStore();
  // Lógica de filtrado y ordenamiento
  return { tasks: filteredTasks, isLoading };
};
```

### useTaskMutations
```tsx
// Maneja mutaciones (create, update, delete)
export const useTaskMutations = () => {
  const { addTask, updateTask, deleteTask } = useTasksStore();
  
  const createTask = async (data: CreateTaskDTO) => {
    // Llamada a API y actualización de store
  };
  
  return { createTask, updateTask, deleteTask };
};
```
