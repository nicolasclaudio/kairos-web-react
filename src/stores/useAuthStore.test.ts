import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from './useAuthStore';
import { authApi } from '../services/api/auth';

// Mock authApi
vi.mock('../services/api/auth', () => ({
    authApi: {
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
    },
}));

describe('useAuthStore', () => {
    beforeEach(() => {
        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
        });
        vi.clearAllMocks();
    });

    it('should have initial state', () => {
        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
    });

    it('login success updates state', async () => {
        const mockUser = { id: '1', email: 'test@test.com', name: 'Test', createdAt: '' };
        const mockResponse = { user: mockUser, token: 'token123' };
        (authApi.login as any).mockResolvedValue(mockResponse);

        await useAuthStore.getState().login('test@test.com', 'pass');

        const state = useAuthStore.getState();
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe('token123');
        expect(state.isAuthenticated).toBe(true);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('login failure sets error', async () => {
        (authApi.login as any).mockRejectedValue(new Error('Auth failed'));

        try {
            await useAuthStore.getState().login('test@test.com', 'wrong');
        } catch (e) {
            // expected
        }

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Auth failed');
        expect(state.isLoading).toBe(false);
    });

    it('logout clears state', () => {
        useAuthStore.setState({
            user: { id: '1', email: 'a', name: 'a', createdAt: '' },
            token: 't',
            isAuthenticated: true
        });

        useAuthStore.getState().logout();

        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(authApi.logout).toHaveBeenCalled();
    });
});
