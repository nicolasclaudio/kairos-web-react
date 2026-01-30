import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { QuickAddInput } from './QuickAddInput';
import { lightTheme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('QuickAddInput', () => {
    it('renders input with placeholder', () => {
        const mockOnAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('Add a new task...');
        expect(input).toBeInTheDocument();
    });

    it('calls onAdd with task title when Enter is pressed', () => {
        const mockOnAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('Add a new task...');
        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockOnAdd).toHaveBeenCalledWith('New Task');
    });

    it('clears input after Enter is pressed', () => {
        const mockOnAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('Add a new task...') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(input.value).toBe('');
    });

    it('does not call onAdd when input is empty', () => {
        const mockOnAdd = vi.fn();
        renderWithTheme(<QuickAddInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('Add a new task...');
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockOnAdd).not.toHaveBeenCalled();
    });
});
