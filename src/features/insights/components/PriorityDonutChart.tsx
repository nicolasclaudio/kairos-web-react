import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { PriorityStats } from '@/types/analytics';

interface PriorityDonutChartProps {
    stats: PriorityStats;
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const COLORS = {
    HIGH: '#DC2626',    // Rojo Carmesí
    MEDIUM: '#F59E0B',  // Ambar
    LOW: '#0052FF',     // Azul Kairos
};

export const PriorityDonutChart: React.FC<PriorityDonutChartProps> = ({ stats }) => {
    const data = [
        { name: 'High Priority', value: stats.HIGH.hours, color: COLORS.HIGH },
        { name: 'Medium Priority', value: stats.MEDIUM.hours, color: COLORS.MEDIUM },
        { name: 'Low Priority', value: stats.LOW.hours, color: COLORS.LOW },
    ].filter(item => item.value > 0); // Only show non-zero values

    const totalHours = stats.HIGH.hours + stats.MEDIUM.hours + stats.LOW.hours;

    if (totalHours === 0) {
        return (
            <Container>
                <Title>Priority Distribution</Title>
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
                    No time tracked yet
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Priority Distribution</Title>
            <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => `${value.toFixed(1)}h`}
                            contentStyle={{
                                backgroundColor: '#1E293B',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry: any) => {
                                const hours = entry.payload.value.toFixed(1);
                                return `${value} (${hours}h)`;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </ChartWrapper>
        </Container>
    );
};
