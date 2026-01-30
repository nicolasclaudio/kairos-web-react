import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { useAuthStore } from '../../../stores/useAuthStore';

// Mock useAuthStore
vi.mock('../../../stores/useAuthStore', () => ({
    useAuthStore: vi.fn(),
}));

const renderComponent = (ui: React.ReactNode) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </ThemeProvider>
    );
}

describe('LoginForm', () => {
    it('renders inputs and button', () => {
        (useAuthStore as any).mockReturnValue({
            login: vi.fn(),
            isLoading: false
        });

        renderComponent(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('calls login on submit', async () => {
        const loginMock = vi.fn().mockResolvedValue(undefined);
        (useAuthStore as any).mockReturnValue({
            login: loginMock,
            isLoading: false
        });

        renderComponent(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'demo@kairos.app' } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password' } });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith('demo@kairos.app', 'password');
        });
    });

    it('shows error toast on failure', async () => {
        const loginMock = vi.fn().mockRejectedValue(new Error('Bad credentials'));
        (useAuthStore as any).mockReturnValue({
            login: loginMock,
            isLoading: false
        });

        renderComponent(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'demo@kairos.app' } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrongpass' } });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(screen.getByText('Bad credentials')).toBeInTheDocument();
        });
    });
});
