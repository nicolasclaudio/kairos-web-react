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

// Insights Dashboard Types
export interface MetricData {
    tasksCompleted: number;
    focusHours: number;
    currentStreak: number;
    weeklyAverage: number;
}

export interface HeatmapDay {
    date: Date;
    hours: number;
    intensity: 0 | 1 | 2 | 3 | 4;
}

export interface PriorityStats {
    HIGH: { count: number; hours: number; percentage: number };
    MEDIUM: { count: number; hours: number; percentage: number };
    LOW: { count: number; hours: number; percentage: number };
}

export interface Achievement {
    taskId: string;
    title: string;
    timeSpent: number;
    completedAt: Date;
}

export type TimeFilter = 'week' | 'month' | 'all';
