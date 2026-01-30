import { describe, it, expect } from 'vitest';
import { formatTime, formatDuration, minutesToSeconds, calculateProgress } from './timeUtils';

describe('timeUtils', () => {
    describe('formatTime', () => {
        it('formats seconds to MM:SS', () => {
            expect(formatTime(0)).toBe('00:00');
            expect(formatTime(59)).toBe('00:59');
            expect(formatTime(60)).toBe('01:00');
            expect(formatTime(125)).toBe('02:05');
            expect(formatTime(1500)).toBe('25:00');
        });
    });

    describe('formatDuration', () => {
        it('formats seconds to human readable duration', () => {
            expect(formatDuration(0)).toBe('0m');
            expect(formatDuration(60)).toBe('1m');
            expect(formatDuration(1500)).toBe('25m');
            expect(formatDuration(3600)).toBe('1h');
            expect(formatDuration(3660)).toBe('1h 1m');
            expect(formatDuration(5400)).toBe('1h 30m');
        });
    });

    describe('minutesToSeconds', () => {
        it('converts minutes to seconds', () => {
            expect(minutesToSeconds(0)).toBe(0);
            expect(minutesToSeconds(1)).toBe(60);
            expect(minutesToSeconds(25)).toBe(1500);
            expect(minutesToSeconds(0.5)).toBe(30);
        });
    });

    describe('calculateProgress', () => {
        it('calculates progress percentage', () => {
            expect(calculateProgress(0, 100)).toBe(0);
            expect(calculateProgress(50, 100)).toBe(50);
            expect(calculateProgress(100, 100)).toBe(100);
            expect(calculateProgress(150, 100)).toBe(100); // caps at 100
        });

        it('handles zero total', () => {
            expect(calculateProgress(50, 0)).toBe(0);
        });
    });
});
