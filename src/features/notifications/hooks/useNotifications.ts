import { useNotificationStore } from '../stores/useNotificationStore';
import type { NotificationType } from '../types/notification';

export const useNotifications = () => {
    const { addNotification, addToast } = useNotificationStore();

    const notify = {
        info: (title: string, message: string, options?: { showToast?: boolean; actionLabel?: string; onAction?: () => void }) => {
            addNotification({ type: 'info', title, message, icon: '⏰', ...options });
            if (options?.showToast !== false) {
                addToast({ type: 'info', title, message, icon: '⏰' }, 5000);
            }
        },

        success: (title: string, message: string, options?: { showToast?: boolean; actionLabel?: string; onAction?: () => void }) => {
            addNotification({ type: 'success', title, message, icon: '✓', ...options });
            if (options?.showToast !== false) {
                addToast({ type: 'success', title, message, icon: '✓' }, 4000);
            }
        },

        warning: (title: string, message: string, options?: { showToast?: boolean; actionLabel?: string; onAction?: () => void }) => {
            addNotification({ type: 'warning', title, message, icon: '⚠', ...options });
            if (options?.showToast !== false) {
                addToast({ type: 'warning', title, message, icon: '⚠' }, 6000);
            }
        },

        error: (title: string, message: string, options?: { showToast?: boolean; actionLabel?: string; onAction?: () => void }) => {
            addNotification({ type: 'error', title, message, icon: '✕', ...options });
            if (options?.showToast !== false) {
                addToast({ type: 'error', title, message, icon: '✕' }, 7000);
            }
        },

        toast: (type: NotificationType, title: string, message: string, duration = 5000) => {
            const icons = { info: '⏰', success: '✓', warning: '⚠', error: '✕' };
            addToast({ type, title, message, icon: icons[type] }, duration);
        },
    };

    return notify;
};
