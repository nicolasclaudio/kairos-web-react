import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { CheckSquare, Clock, Flame, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ActivityHeatmap } from '../components/ActivityHeatmap';
import { PriorityDonutChart } from '../components/PriorityDonutChart';
import { TopAchievements } from '../components/TopAchievements';
import { TimeFilterComponent } from '../components/TimeFilter';
import { useTasksStore } from '@/store/useTasksStore';
import { useTimerStore } from '@/store/useTimerStore';
import {
    getMetrics,
    generateHeatmapData,
    getPriorityDistribution,
    getTopAchievements,
    getDateRange
} from '@/utils/analyticsUtils';
import type { TimeFilter } from '@/types/analytics';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.offWhite};
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const HeatmapSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightsView: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
    const { tasks } = useTasksStore();
    const { timeSpent } = useTimerStore();

    const metrics = useMemo(() => {
        return getMetrics(tasks, timeSpent, timeFilter);
    }, [tasks, timeSpent, timeFilter]);

    const heatmapData = useMemo(() => {
        const { start, end } = getDateRange(timeFilter);
        return generateHeatmapData(timeSpent, tasks, start, end);
    }, [tasks, timeSpent, timeFilter]);

    const priorityStats = useMemo(() => {
        const { start, end } = getDateRange(timeFilter);
        return getPriorityDistribution(timeSpent, tasks, start, end);
    }, [tasks, timeSpent, timeFilter]);

    const achievements = useMemo(() => {
        const { start, end } = getDateRange(timeFilter);
        return getTopAchievements(timeSpent, tasks, start, end, 5);
    }, [tasks, timeSpent, timeFilter]);

    return (
        <PageContainer>
            <ContentWrapper>
                <Header>
                    <Title>Insights</Title>
                    <TimeFilterComponent value={timeFilter} onChange={setTimeFilter} />
                </Header>

                <MetricsGrid>
                    <MetricCard
                        title="Tasks Completed"
                        value={metrics.tasksCompleted}
                        icon={<CheckSquare size={24} />}
                        color="#0052FF"
                    />
                    <MetricCard
                        title="Focus Hours"
                        value={metrics.focusHours}
                        icon={<Clock size={24} />}
                        color="#0052FF"
                    />
                    <MetricCard
                        title="Current Streak"
                        value={`${metrics.currentStreak} days`}
                        icon={<Flame size={24} />}
                        color="#F59E0B"
                    />
                    <MetricCard
                        title="Weekly Average"
                        value={metrics.weeklyAverage}
                        icon={<TrendingUp size={24} />}
                        color="#10B981"
                    />
                </MetricsGrid>

                <HeatmapSection>
                    <ActivityHeatmap data={heatmapData} />
                </HeatmapSection>

                <ChartsGrid>
                    <PriorityDonutChart stats={priorityStats} />
                    <TopAchievements achievements={achievements} />
                </ChartsGrid>
            </ContentWrapper>
        </PageContainer>
    );
};
