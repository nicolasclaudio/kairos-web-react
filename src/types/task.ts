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
    actualMinutes?: number;
}

export interface TaskFilters {
    status?: TaskStatus[];
    priority?: TaskPriority[];
    projectId?: string;
    tags?: string[];
    search?: string;
}
