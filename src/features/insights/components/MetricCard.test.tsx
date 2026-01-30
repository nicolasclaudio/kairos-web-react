import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MetricCard } from './MetricCard';
import { lightTheme } from '@/styles/theme';
import { CheckSquare } from 'lucide-react';

const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('MetricCard', () => {
    it('renders title and value', () => {
        renderWithTheme(
            <MetricCard
                title="Tasks Completed"
                value={42}
                icon={<CheckSquare size={24} />}
            />
        );

        expect(screen.getByText('TASKS COMPLETED')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('displays trend when provided', () => {
        renderWithTheme(
            <MetricCard
                title="Focus Hours"
                value="12.5"
                icon={<CheckSquare size={24} />}
                trend={15}
            />
        );

        expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('renders icon', () => {
        const { container } = renderWithTheme(
            <MetricCard
                title="Test"
                value={10}
                icon={<CheckSquare data-testid="icon" size={24} />}
            />
        );

        expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
    });
});
