export interface AnalyticsData {
    velocity: VelocityMetric;
    impact: ImpactMetric;
    streak: StreakMetric;
    weeklyData: WeeklyDataPoint[];
}

export interface VelocityMetric {
    current: number; // minutos promedio por día
    trend: 'up' | 'down' | 'stable';
    change: number; // porcentaje de cambio
    previousPeriod: number;
}

export interface ImpactMetric {
    highPriorityCompleted: number;
    totalCompleted: number;
    percentage: number;
    averageMetaScore: number;
}

export interface StreakMetric {
    current: number; // días consecutivos
    best: number; // mejor racha histórica
    dailyGoal: number; // minutos objetivo
}

export interface WeeklyDataPoint {
    date: Date;
    minutes: number;
    tasksCompleted: number;
    goal: number;
}

export interface TimeRange {
    start: Date;
    end: Date;
}
