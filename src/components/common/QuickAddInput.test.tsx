import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickAddInput } from './QuickAddInput';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';

const renderWithTheme = (component: React.ReactNode) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            {component}
        </ThemeProvider>
    );
};

describe('QuickAddInput', () => {
    it('renders input field correctly', () => {
        renderWithTheme(<QuickAddInput onAdd={vi.fn()} />);
        expect(screen.getByPlaceholderText('Añadir nueva tarea...')).toBeInTheDocument();
    });

    it('calls onAdd when form is submitted', () => {
        const handleAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('Añadir nueva tarea...');
        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.submit(input);

        expect(handleAdd).toHaveBeenCalledWith('New Task', 'MEDIUM');
    });

    it('does not call onAdd directly when empty', () => {
        const handleAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('Añadir nueva tarea...');
        fireEvent.submit(input);

        expect(handleAdd).not.toHaveBeenCalled();
    });

    it('changes priority when selector is clicked', () => {
        const handleAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={handleAdd} />);

        const highPriorityBtn = screen.getByRole('button', { name: /Priority HIGH/i });
        fireEvent.click(highPriorityBtn);

        const input = screen.getByPlaceholderText('Añadir nueva tarea...');
        fireEvent.change(input, { target: { value: 'Urgent Task' } });
        fireEvent.submit(input);

        expect(handleAdd).toHaveBeenCalledWith('Urgent Task', 'HIGH');
    });
});
