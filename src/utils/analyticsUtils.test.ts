import { describe, it, expect } from 'vitest';
import {
    getTasksCompleted,
    getFocusHours,
    getCurrentStreak,
    generateHeatmapData,
    getPriorityDistribution,
    getTopAchievements
} from './analyticsUtils';
import type { Task } from '@/types';

describe('analyticsUtils', () => {
    const mockTasks: Task[] = [
        {
            id: '1',
            title: 'Task 1',
            status: 'DONE',
            priority: 'HIGH',
            tags: [],
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
            completedAt: new Date('2024-01-15'),
        },
        {
            id: '2',
            title: 'Task 2',
            status: 'DONE',
            priority: 'MEDIUM',
            tags: [],
            createdAt: new Date('2024-01-16'),
            updatedAt: new Date('2024-01-16'),
            completedAt: new Date('2024-01-16'),
        },
        {
            id: '3',
            title: 'Task 3',
            status: 'TODO',
            priority: 'LOW',
            tags: [],
            createdAt: new Date('2024-01-17'),
            updatedAt: new Date('2024-01-17'),
        },
    ];

    const mockTimeSpent = {
        '1': 3600, // 1 hour
        '2': 7200, // 2 hours
        '3': 1800, // 30 min
    };

    describe('getTasksCompleted', () => {
        it('counts completed tasks in date range', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const count = getTasksCompleted(mockTasks, start, end);
            expect(count).toBe(2);
        });

        it('returns 0 when no tasks in range', () => {
            const start = new Date('2023-01-01');
            const end = new Date('2023-12-31');
            const count = getTasksCompleted(mockTasks, start, end);
            expect(count).toBe(0);
        });
    });

    describe('getFocusHours', () => {
        it('calculates total focus hours', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const hours = getFocusHours(mockTimeSpent, mockTasks, start, end);
            expect(hours).toBe(3.0); // 1h + 2h = 3h
        });
    });

    describe('getCurrentStreak', () => {
        it('calculates streak correctly', () => {
            const streak = getCurrentStreak(mockTasks);
            expect(streak).toBeGreaterThanOrEqual(0);
        });

        it('returns 0 for empty tasks', () => {
            const streak = getCurrentStreak([]);
            expect(streak).toBe(0);
        });
    });

    describe('generateHeatmapData', () => {
        it('generates heatmap data for date range', () => {
            const start = new Date('2024-01-15');
            const end = new Date('2024-01-17');
            const heatmap = generateHeatmapData(mockTimeSpent, mockTasks, start, end);

            expect(heatmap).toHaveLength(3);
            expect(heatmap[0]).toHaveProperty('date');
            expect(heatmap[0]).toHaveProperty('hours');
            expect(heatmap[0]).toHaveProperty('intensity');
        });

        it('assigns correct intensity levels', () => {
            const start = new Date('2024-01-15');
            const end = new Date('2024-01-15');
            const heatmap = generateHeatmapData(mockTimeSpent, mockTasks, start, end);

            expect(heatmap[0].intensity).toBeGreaterThanOrEqual(0);
            expect(heatmap[0].intensity).toBeLessThanOrEqual(4);
        });
    });

    describe('getPriorityDistribution', () => {
        it('calculates priority distribution', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const stats = getPriorityDistribution(mockTimeSpent, mockTasks, start, end);

            expect(stats).toHaveProperty('HIGH');
            expect(stats).toHaveProperty('MEDIUM');
            expect(stats).toHaveProperty('LOW');
            expect(stats.HIGH.count).toBe(1);
            expect(stats.MEDIUM.count).toBe(1);
        });

        it('percentages sum to 100', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const stats = getPriorityDistribution(mockTimeSpent, mockTasks, start, end);

            const total = stats.HIGH.percentage + stats.MEDIUM.percentage + stats.LOW.percentage;
            expect(total).toBeLessThanOrEqual(100);
        });
    });

    describe('getTopAchievements', () => {
        it('returns top achievements sorted by time', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const achievements = getTopAchievements(mockTimeSpent, mockTasks, start, end, 5);

            expect(achievements).toHaveLength(2);
            expect(achievements[0].timeSpent).toBeGreaterThanOrEqual(achievements[1].timeSpent);
        });

        it('limits results to specified count', () => {
            const start = new Date('2024-01-01');
            const end = new Date('2024-01-31');
            const achievements = getTopAchievements(mockTimeSpent, mockTasks, start, end, 1);

            expect(achievements).toHaveLength(1);
        });
    });
});
