import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculatePriorityStats } from '../../../utils/analyticsUtils';
import type { Task } from '../../../types';

interface PriorityDonutChartProps {
    tasks: Task[];
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 200px;
`;

const CustomTooltip = styled.div`
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const TooltipLabel = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
`;

const TooltipValue = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

export const PriorityDonutChart: React.FC<PriorityDonutChartProps> = ({ tasks }) => {
    const stats = useMemo(() => calculatePriorityStats(tasks), [tasks]);

    const data = [
        { name: 'Alta', value: stats.HIGH.count, color: '#DC2626' },   // Kairos Rojo Carmesí
        { name: 'Media', value: stats.MEDIUM.count, color: '#F59E0B' }, // Kairos Ambar
        { name: 'Baja', value: stats.LOW.count, color: '#0052FF' },     // Kairos Azul
    ].filter(d => d.value > 0);

    const renderTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <CustomTooltip>
                    <TooltipLabel style={{ color: data.color }}>{data.name}</TooltipLabel>
                    <TooltipValue>{data.value} tareas</TooltipValue>
                </CustomTooltip>
            );
        }
        return null;
    };

    return (
        <Container>
            <Title>Distribución por Prioridad</Title>
            <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip content={renderTooltip} cursor={false} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </ChartWrapper>
        </Container>
    );
};
