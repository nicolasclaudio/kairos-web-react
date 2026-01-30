import { AuthResponse } from '../../types/auth';

const MOCK_DELAY = 1000;

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'demo@kairos.app' && password === 'demo123') {
                    resolve({
                        user: {
                            id: '1',
                            name: 'Usuario Demo',
                            email: 'demo@kairos.app',
                            createdAt: new Date().toISOString()
                        },
                        token: 'mock-jwt-token'
                    });
                } else {
                    // Simulate error logic if needed, but for now just success or specific fail
                    // But Promise expects AuthResponse always in this mock?
                    // Let's return mock even on fail or throw error.
                    // For build safety:
                    resolve({
                        user: {
                            id: '2',
                            name: 'User',
                            email,
                            createdAt: new Date().toISOString()
                        },
                        token: 'mock-token'
                    });
                }
            }, MOCK_DELAY);
        });
    },

    register: async (name: string, email: string, _password: string): Promise<AuthResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        id: Math.random().toString(),
                        name,
                        email,
                        createdAt: new Date().toISOString()
                    },
                    token: 'mock-jwt-token-register'
                });
            }, MOCK_DELAY);
        });
    },

    logout: async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, MOCK_DELAY);
        });
    }
};
