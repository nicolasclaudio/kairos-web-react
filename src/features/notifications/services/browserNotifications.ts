export class BrowserNotificationService {
    private static instance: BrowserNotificationService;
    private permission: NotificationPermission = 'default';

    private constructor() {
        this.checkPermission();
    }

    static getInstance(): BrowserNotificationService {
        if (!BrowserNotificationService.instance) {
            BrowserNotificationService.instance = new BrowserNotificationService();
        }
        return BrowserNotificationService.instance;
    }

    private checkPermission(): void {
        if ('Notification' in window) {
            this.permission = Notification.permission;
        }
    }

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.warn('Browser notifications are not supported');
            return false;
        }

        if (this.permission === 'granted') {
            return true;
        }

        const permission = await Notification.requestPermission();
        this.permission = permission;
        return permission === 'granted';
    }

    async send(title: string, options?: NotificationOptions): Promise<void> {
        if (this.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) return;
        }

        try {
            const notification = new Notification(title, {
                icon: '/logo.png',
                badge: '/logo.png',
                ...options,
            });

            // Auto-close after 5 seconds
            setTimeout(() => notification.close(), 5000);
        } catch (error) {
            console.error('Failed to send notification:', error);
        }
    }

    isSupported(): boolean {
        return 'Notification' in window;
    }

    getPermission(): NotificationPermission {
        return this.permission;
    }
}

export const browserNotifications = BrowserNotificationService.getInstance();
