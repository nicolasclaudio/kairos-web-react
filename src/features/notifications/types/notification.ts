export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    icon?: string;
    timestamp: Date;
    read: boolean;
    actionLabel?: string;
    onAction?: () => void;
    duration?: number; // For toasts: duration in ms (0 = persistent)
}

export interface ToastNotification extends Notification {
    duration: number;
}

export type NotificationFilter = 'all' | 'unread' | NotificationType;
