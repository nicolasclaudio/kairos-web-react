export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}
