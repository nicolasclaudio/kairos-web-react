import React from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../../../stores/taskStore';
import { calculateMetrics } from '../../../utils/analyticsUtils';
import { MetricCard } from './MetricCard';
import { ActivityHeatmap } from './ActivityHeatmap';
import { PriorityDonutChart } from './PriorityDonutChart';
import { TopAchievements } from './TopAchievements';

const Container = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.colors.background}; // Off-White
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  margin: 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightsView: React.FC = () => {
  const { tasks } = useTaskStore();

  // Calculate specific metrics
  const metrics = React.useMemo(() => calculateMetrics(tasks), [tasks]);

  return (
    <Container>
      <Header>
        <Title>Espejo de Productividad</Title>
        <Subtitle>Analiza tus patrones y celebra tus logros</Subtitle>
      </Header>

      <MetricsGrid>
        <MetricCard
          label="Tareas Completadas"
          value={metrics.tasksCompleted}
          subtext="Total histórico"
        />
        <MetricCard
          label="Horas de Enfoque"
          value={metrics.focusHours}
          subtext="Tiempo de calidad invertido"
        />
        <MetricCard
          label="Racha Actual"
          value={`${metrics.currentStreak} días`}
          subtext="Mantén el ritmo"
        />
        <MetricCard
          label="Promedio Semanal"
          value={metrics.weeklyAverage}
          subtext="Tareas por semana"
        />
      </MetricsGrid>

      <DashboardGrid>
        <ActivityHeatmap tasks={tasks} />
        <PriorityDonutChart tasks={tasks} />
        <TopAchievements tasks={tasks} />
      </DashboardGrid>
    </Container>
  );
};
