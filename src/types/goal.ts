export type GoalStatus = 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';

export interface Goal {
    id: string;
    title: string;
    description?: string;
    icon?: string; // Emoji character or icon name
    color?: string; // Hex color code
    targetValue?: number; // e.g. 8000
    currentValue?: number; // e.g. 4500 (manually updated or calculated)
    metricUnit?: string; // e.g. "USD", "Modules", "Kg"
    deadline?: Date;
    status: GoalStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateGoalDTO {
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    targetValue?: number;
    currentValue?: number;
    metricUnit?: string;
    deadline?: Date;
}

export interface UpdateGoalDTO extends Partial<CreateGoalDTO> {
    status?: GoalStatus;
    currentValue?: number;
}
