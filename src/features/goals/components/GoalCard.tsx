import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Goal } from '../../../types/goal';
import { useTasksStore } from '@/store/useTasksStore';

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 280px;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(180deg, rgba(0, 82, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 16px 16px 0 0;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 16px;
  z-index: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  text-align: center;
  margin: 0 0 8px 0;
  font-weight: 700;
  z-index: 1;
`;

const ProgressContainer = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  margin: 16px 0;
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Percentage = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
`;

const Label = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MetricValue = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  font-weight: 600;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  padding: 4px 12px;
  border-radius: 12px;
  margin-top: 8px;
`;

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { tasks } = useTasksStore();

  const progress = useMemo(() => {
    // 1. Calculate based on linked tasks completion
    const goalTasks = tasks.filter(t => t.goalId === goal.id);
    if (goalTasks.length > 0) {
      const completed = goalTasks.filter(t => t.status === 'DONE').length;
      return Math.round((completed / goalTasks.length) * 100);
    }

    // 2. Or fallback to manual currentValue / targetValue (if set)
    if (goal.targetValue && goal.currentValue !== undefined) {
      return Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
    }

    return 0;
  }, [goal, tasks]);

  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const COLORS = ['#10B981', '#E2E8F0']; // Emerald vs Slate-200

  return (
    <Card>
      <IconWrapper>
        {goal.icon || '🎯'}
      </IconWrapper>

      <Title>{goal.title}</Title>

      <ProgressContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={65}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ProgressLabel>
          <Percentage>{progress}%</Percentage>
          <Label>Progreso</Label>
        </ProgressLabel>
      </ProgressContainer>

      {goal.targetValue && (
        <MetricValue>
          {goal.currentValue} / {goal.targetValue} {goal.metricUnit}
        </MetricValue>
      )}
    </Card>
  );
};
