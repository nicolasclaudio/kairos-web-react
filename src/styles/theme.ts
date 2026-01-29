export const lightTheme = {
    colors: {
        // Primary colors
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryLight: '#818cf8',

        // Secondary colors
        secondary: '#8b5cf6',
        secondaryHover: '#7c3aed',

        // Status colors
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',

        // Kairos Brand Colors
        offWhite: '#F8FAFC',
        charcoal: '#1E293B',
        slateGray: '#64748B',
        azulKairos: '#0052FF',
        rojoCarmesi: '#DC2626',
        ambar: '#F59E0B',
        verdeEsmeralda: '#10B981',

        // Background colors (using Kairos palette)
        background: '#F8FAFC',  // Off-White
        backgroundSecondary: '#f9fafb',
        surface: '#ffffff',
        surfaceHover: '#f3f4f6',

        // Text colors (using Kairos palette)
        text: '#1E293B',  // Charcoal
        textSecondary: '#64748B',  // Slate Gray
        textTertiary: '#9ca3af',

        // Border colors
        border: '#e5e7eb',
        borderHover: '#d1d5db',

        // Priority colors (Kairos specific)
        priorityLow: '#0052FF',  // Azul Kairos
        priorityMedium: '#F59E0B',  // Ambar
        priorityHigh: '#DC2626',  // Rojo Carmesí
        priorityUrgent: '#DC2626',  // Rojo Carmesí
    },

    spacing: {
        xs: '0.25rem',    // 4px
        sm: '0.5rem',     // 8px
        md: '1rem',       // 16px
        lg: '1.5rem',     // 24px
        xl: '2rem',       // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
    },

    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
    },

    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
    },

    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
        // Task-specific shadows
        taskCard: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
        taskCardHover: '0 8px 16px -4px rgb(0 0 0 / 0.12)',
        quickAdd: '0 2px 8px 0 rgb(0 0 0 / 0.06)',
    },

    transitions: {
        fast: '150ms ease-in-out',
        base: '300ms ease-in-out',
        slow: '500ms ease-in-out',
    },

    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
};

export const darkTheme: typeof lightTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,

        // Background colors
        background: '#0f172a',
        backgroundSecondary: '#1e293b',
        surface: '#1e293b',
        surfaceHover: '#334155',

        // Text colors
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        textTertiary: '#64748b',

        // Border colors
        border: '#334155',
        borderHover: '#475569',
    },
};

export type Theme = typeof lightTheme;
