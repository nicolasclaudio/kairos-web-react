import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Task, TaskPriority } from '../types';
import type { MetricData, HeatmapDay, PriorityStats, Achievement } from '../types/analytics';

/**
 * Calculates summary metrics for the dashboard
 */
export const calculateMetrics = (tasks: Task[]): MetricData => {
    const completedTasks = tasks.filter(t => t.status === 'DONE');

    // Calculate focus hours (using estimatedMinutes as proxy for now, / 60)
    const totalMinutes = completedTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

    // Calculate streak (simplified: consecutive days with completed tasks looking back from today)
    let currentStreak = 0;
    const today = new Date();
    let checkDate = today;

    // Check if active today
    const activeToday = completedTasks.some(t =>
        t.completedAt && isSameDay(new Date(t.completedAt), checkDate)
    );

    if (activeToday) currentStreak++;

    // Look back
    while (true) {
        checkDate = subDays(checkDate, 1);
        const hasActivity = completedTasks.some(t =>
            t.completedAt && isSameDay(new Date(t.completedAt), checkDate)
        );

        if (hasActivity) {
            currentStreak++;
        } else {
            break;
        }
    }

    // Weekly average (tasks per week last 4 weeks) - Simplified for now
    const weeklyAverage = completedTasks.length > 0 ? Math.round(completedTasks.length / 4) : 0;

    return {
        tasksCompleted: completedTasks.length,
        focusHours: Math.round((totalMinutes / 60) * 10) / 10,
        currentStreak,
        weeklyAverage
    };
};

/**
 * Generates data for the GitHub-style heatmap
 */
export const generateHeatmapData = (tasks: Task[], days: number = 365): HeatmapDay[] => {
    const endDate = new Date();
    const startDate = subDays(endDate, days);

    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    const completedTasks = tasks.filter(t => t.status === 'DONE' && t.completedAt);

    return dates.map(date => {
        const dayTasks = completedTasks.filter(t =>
            t.completedAt && isSameDay(new Date(t.completedAt), date)
        );

        // Calculate intensity based on minutes or count
        const minutes = dayTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

        let intensity: 0 | 1 | 2 | 3 | 4 = 0;
        if (minutes > 0) intensity = 1;
        if (minutes > 60) intensity = 2;
        if (minutes > 180) intensity = 3;
        if (minutes > 300) intensity = 4;

        return {
            date,
            hours: Math.round((minutes / 60) * 10) / 10,
            intensity
        };
    });
};

/**
 * Calculates priority distribution for the donut chart
 */
export const calculatePriorityStats = (tasks: Task[]): PriorityStats => {
    const completed = tasks.filter(t => t.status === 'DONE');
    const total = completed.length || 1; // Avoid division by zero

    const stats = {
        HIGH: { count: 0, hours: 0, percentage: 0 },
        MEDIUM: { count: 0, hours: 0, percentage: 0 },
        LOW: { count: 0, hours: 0, percentage: 0 },
        URGENT: { count: 0, hours: 0, percentage: 0 }
    };

    completed.forEach(task => {
        const hours = (task.estimatedMinutes || 0) / 60;
        if (stats[task.priority]) {
            stats[task.priority].count++;
            stats[task.priority].hours += hours;
        }
    });

    // Calculate percentages
    (Object.keys(stats) as Array<keyof PriorityStats>).forEach(key => {
        stats[key].percentage = Math.round((stats[key].count / total) * 100);
    });

    return stats;
};

/**
 * Gets top 5 "Big Wins" based on metaScore and duration
 */
export const getTopAchievements = (tasks: Task[]): Achievement[] => {
    return tasks
        .filter(t => t.status === 'DONE' && t.completedAt)
        .sort((a, b) => {
            // Score = Priority Weight * Duration
            const getWeight = (p: TaskPriority) => p === 'URGENT' ? 4 : p === 'HIGH' ? 3 : p === 'MEDIUM' ? 2 : 1;
            const scoreA = getWeight(a.priority) * (a.estimatedMinutes || 0);
            const scoreB = getWeight(b.priority) * (b.estimatedMinutes || 0);
            return scoreB - scoreA;
        })
        .slice(0, 5)
        .map(t => ({
            taskId: t.id,
            title: t.title,
            timeSpent: t.estimatedMinutes || 0,
            completedAt: t.completedAt!
        }));
};
