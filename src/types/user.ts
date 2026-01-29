export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    language: 'en' | 'es';
    notifications: boolean;
    pomodoroLength: number; // minutos
    shortBreakLength: number; // minutos
    longBreakLength: number; // minutos
    dailyGoalMinutes: number;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO extends LoginDTO {
    name: string;
}
