export interface Project {
    id: string;
    name: string;
    description?: string;
    color: string;
    icon?: string;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProjectDTO {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
    isArchived?: boolean;
}
