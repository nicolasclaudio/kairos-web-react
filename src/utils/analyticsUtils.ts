import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, eachDayOfInterval, differenceInCalendarDays, isSameDay } from 'date-fns';
import type { Task } from '@/types';
import type { MetricData, HeatmapDay, PriorityStats, Achievement, TimeFilter } from '@/types/analytics';

/**
 * Get date range for filter
 */
export const getDateRange = (filter: TimeFilter): { start: Date; end: Date } => {
    const now = new Date();

    switch (filter) {
        case 'week':
            return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
        case 'month':
            return { start: startOfMonth(now), end: endOfMonth(now) };
        case 'all':
            return { start: new Date(2020, 0, 1), end: now };
        default:
            return { start: startOfWeek(now), end: endOfWeek(now) };
    }
};

/**
 * Calculate tasks completed in date range
 */
export const getTasksCompleted = (tasks: Task[], start: Date, end: Date): number => {
    return tasks.filter(task =>
        task.status === 'DONE' &&
        task.completedAt &&
        isWithinInterval(new Date(task.completedAt), { start, end })
    ).length;
};

/**
 * Calculate total focus hours
 */
export const getFocusHours = (timespent: Record<string, number>, tasks: Task[], start: Date, end: Date): number => {
    const completedInRange = tasks.filter(task =>
        task.status === 'DONE' &&
        task.completedAt &&
        isWithinInterval(new Date(task.completedAt), { start, end })
    );

    const totalSeconds = completedInRange.reduce((sum, task) => {
        return sum + (timeSpent[task.id] || 0);
    }, 0);

    return Number((totalSeconds / 3600).toFixed(1)); // Convert to hours
};

/**
 * Calculate current streak (consecutive days with completed tasks)
 */
export const getCurrentStreak = (tasks: Task[]): number => {
    const completedTasks = tasks
        .filter(t => t.status === 'DONE' && t.completedAt)
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

    if (completedTasks.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < completedTasks.length; i++) {
        const taskDate = new Date(completedTasks[i].completedAt!);
        taskDate.setHours(0, 0, 0, 0);

        const daysDiff = differenceInCalendarDays(currentDate, taskDate);

        if (daysDiff === 0 || daysDiff === streak + 1) {
            if (!isSameDay(taskDate, currentDate) || i === 0) {
                streak++;
            }
            currentDate = taskDate;
        } else {
            break;
        }
    }

    return streak;
};

/**
 * Generate heatmap data for the date range
 */
export const generateHeatmapData = (
    timeSpent: Record<string, number>,
    tasks: Task[],
    start: Date,
    end: Date
): HeatmapDay[] => {
    const days = eachDayOfInterval({ start, end });

    return days.map(date => {
        const tasksOnDay = tasks.filter(task =>
            task.completedAt && isSameDay(new Date(task.completedAt), date)
        );

        const seconds = tasksOnDay.reduce((sum, task) => sum + (timeSpent[task.id] || 0), 0);
        const hours = Number((seconds / 3600).toFixed(1));

        // Determine intensity (0-4)
        let intensity: 0 | 1 | 2 | 3 | 4 = 0;
        if (hours > 6) intensity = 4;
        else if (hours > 4) intensity = 3;
        else if (hours > 2) intensity = 2;
        else if (hours > 0) intensity = 1;

        return { date, hours, intensity };
    });
};

/**
 * Calculate priority distribution
 */
export const getPriorityDistribution = (
    timeSpent: Record<string, number>,
    tasks: Task[],
    start: Date,
    end: Date
): PriorityStats => {
    const completedInRange = tasks.filter(task =>
        task.status === 'DONE' &&
        task.completedAt &&
        isWithinInterval(new Date(task.completedAt), { start, end })
    );

    const stats = {
        HIGH: { count: 0, hours: 0, percentage: 0 },
        MEDIUM: { count: 0, hours: 0, percentage: 0 },
        LOW: { count: 0, hours: 0, percentage: 0 },
    };

    completedInRange.forEach(task => {
        const seconds = timeSpent[task.id] || 0;
        const hours = seconds / 3600;

        stats[task.priority].count++;
        stats[task.priority].hours += hours;
    });

    const totalHours = stats.HIGH.hours + stats.MEDIUM.hours + stats.LOW.hours;

    if (totalHours > 0) {
        stats.HIGH.percentage = Math.round((stats.HIGH.hours / totalHours) * 100);
        stats.MEDIUM.percentage = Math.round((stats.MEDIUM.hours / totalHours) * 100);
        stats.LOW.percentage = Math.round((stats.LOW.hours / totalHours) * 100);
    }

    return stats;
};

/**
 * Get top achievements (tasks with most time spent)
 */
export const getTopAchievements = (
    timeSpent: Record<string, number>,
    tasks: Task[],
    start: Date,
    end: Date,
    limit: number = 5
): Achievement[] => {
    const completedInRange = tasks.filter(task =>
        task.status === 'DONE' &&
        task.completedAt &&
        isWithinInterval(new Date(task.completedAt), { start, end })
    );

    return completedInRange
        .map(task => ({
            taskId: task.id,
            title: task.title,
            timeSpent: timeSpent[task.id] || 0,
            completedAt: new Date(task.completedAt!),
        }))
        .sort((a, b) => b.timeSpent - a.timeSpent)
        .slice(0, limit);
};

/**
 * Get all metrics for dashboard
 */
export const getMetrics = (
    tasks: Task[],
    timeSpent: Record<string, number>,
    filter: TimeFilter
): MetricData => {
    const { start, end } = getDateRange(filter);
    const tasksCompleted = getTasksCompleted(tasks, start, end);
    const focusHours = getFocusHours(timeSpent, tasks, start, end);
    const currentStreak = getCurrentStreak(tasks);
    const daysInRange = differenceInCalendarDays(end, start) + 1;
    const weeklyAverage = daysInRange >= 7 ? Number((tasksCompleted / (daysInRange / 7)).toFixed(1)) : 0;

    return {
        tasksCompleted,
        focusHours,
        currentStreak,
        weeklyAverage,
    };
};
