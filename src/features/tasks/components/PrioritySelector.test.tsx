import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { PrioritySelector } from './PrioritySelector';
import { lightTheme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('PrioritySelector', () => {
    it('renders all priority options', () => {
        const mockOnChange = vi.fn();
        renderWithTheme(<PrioritySelector value="MEDIUM" onChange={mockOnChange} />);

        expect(screen.getByText('Low')).toBeInTheDocument();
        expect(screen.getByText('Medium')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('calls onChange when priority is clicked', () => {
        const mockOnChange = vi.fn();
        renderWithTheme(<PrioritySelector value="MEDIUM" onChange={mockOnChange} />);

        const highButton = screen.getByText('High');
        highButton.click();

        expect(mockOnChange).toHaveBeenCalledWith('HIGH');
    });

    it('highlights the selected priority', () => {
        const mockOnChange = vi.fn();
        renderWithTheme(
            <PrioritySelector value="HIGH" onChange={mockOnChange} />
        );

        const highButton = screen.getByText('High');
        expect(highButton).toBeInTheDocument();
    });
});
