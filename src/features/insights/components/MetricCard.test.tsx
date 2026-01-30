import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactNode) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            {component}
        </ThemeProvider>
    );
};

describe('MetricCard', () => {
    it('renders label and value', () => {
        renderWithTheme(<MetricCard label="Tasks" value="12" />);
        expect(screen.getByText('Tasks')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('renders subtext when provided', () => {
        renderWithTheme(<MetricCard label="Tasks" value="12" subtext="Last 7 days" />);
        expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    });
});
