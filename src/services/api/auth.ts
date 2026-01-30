import { AuthResponse, User } from '../../types/auth';

const MOCK_DELAY = 1000;

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'demo@kairos.app' && password === 'demo123') {
                    resolve({
                        user: {
                            id: '1',
                            email: 'demo@kairos.app',
                            name: 'Kairos User',
                            createdAt: new Date().toISOString(),
                            avatarUrl: 'https://ui-avatars.com/api/?name=Kairos+User&background=0052FF&color=fff'
                        },
                        token: 'mock-jwt-token-123456'
                    });
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, MOCK_DELAY);
        });
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: Math.random().toString(36).substr(2, 9),
                        email,
                        name,
                        createdAt: new Date().toISOString(),
                        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0052FF&color=fff`
                    },
                    token: 'mock-jwt-token-' + Date.now()
                });
            }, MOCK_DELAY);
        });
    },

    logout: async (): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
};
