/**
 * Format seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to human-readable duration (e.g., "25m" or "1h 25m")
 */
export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }

    return `${minutes}m`;
};

/**
 * Convert minutes to seconds
 */
export const minutesToSeconds = (minutes: number): number => minutes * 60;

/**
 * Calculate progress percentage
 */
export const calculateProgress = (elapsed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.min(100, (elapsed / total) * 100);
};
