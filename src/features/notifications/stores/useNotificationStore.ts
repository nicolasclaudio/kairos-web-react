import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Notification } from '../types/notification';

interface NotificationState {
    notifications: Notification[];
    toasts: Notification[];
    unreadCount: number;
    isNotificationCenterOpen: boolean;

    // Actions
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    addToast: (toast: Omit<Notification, 'id' | 'timestamp' | 'read'>, duration?: number) => string;
    removeToast: (id: string) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
    toggleNotificationCenter: () => void;
    closeNotificationCenter: () => void;
}

export const useNotificationStore = create<NotificationState>()(
    devtools(
        persist(
            (set, get) => ({
                notifications: [],
                toasts: [],
                unreadCount: 0,
                isNotificationCenterOpen: false,

                addNotification: (notification) => {
                    const newNotification: Notification = {
                        ...notification,
                        id: crypto.randomUUID(),
                        timestamp: new Date(),
                        read: false,
                    };

                    set((state) => ({
                        notifications: [newNotification, ...state.notifications],
                        unreadCount: state.unreadCount + 1,
                    }));
                },

                addToast: (toast, duration = 5000) => {
                    const newToast: Notification = {
                        ...toast,
                        id: crypto.randomUUID(),
                        timestamp: new Date(),
                        read: false,
                        duration,
                    };

                    set((state) => ({
                        toasts: [...state.toasts, newToast],
                    }));

                    // Auto-remove toast after duration
                    if (duration > 0) {
                        setTimeout(() => {
                            get().removeToast(newToast.id);
                        }, duration);
                    }

                    return newToast.id;
                },

                removeToast: (id) => {
                    set((state) => ({
                        toasts: state.toasts.filter((toast) => toast.id !== id),
                    }));
                },

                markAsRead: (id) => {
                    set((state) => ({
                        notifications: state.notifications.map((notif) =>
                            notif.id === id ? { ...notif, read: true } : notif
                        ),
                        unreadCount: Math.max(0, state.unreadCount - 1),
                    }));
                },

                markAllAsRead: () => {
                    set((state) => ({
                        notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
                        unreadCount: 0,
                    }));
                },

                clearNotifications: () => {
                    set({
                        notifications: [],
                        unreadCount: 0,
                    });
                },

                toggleNotificationCenter: () => {
                    set((state) => ({
                        isNotificationCenterOpen: !state.isNotificationCenterOpen,
                    }));
                },

                closeNotificationCenter: () => {
                    set({ isNotificationCenterOpen: false });
                },
            }),
            {
                name: 'kairos-notifications-storage',
                partialize: (state) => ({
                    notifications: state.notifications,
                    unreadCount: state.unreadCount,
                }),
            }
        )
    )
);
