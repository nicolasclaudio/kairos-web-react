import React from 'react';
import styled from 'styled-components';
import { Check, Clock } from 'lucide-react';
import { formatDuration } from '@/utils/timeUtils';
import type { Achievement } from '@/types/analytics';

interface TopAchievementsProps {
    achievements: Achievement[];
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

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AchievementItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CheckIcon = styled.div`
  color: ${({ theme }) => theme.colors.verdeEsmeralda};
  flex-shrink: 0;
`;

const TaskInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.charcoal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeSpent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.slateGray};
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.slateGray};
`;

export const TopAchievements: React.FC<TopAchievementsProps> = ({ achievements }) => {
    if (achievements.length === 0) {
        return (
            <Container>
                <Title>Top Achievements</Title>
                <EmptyState>
                    <p>🎯 No completed tasks yet</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>
                        Complete tasks to see your top achievements!
                    </p>
                </EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Top Achievements</Title>
            <List>
                {achievements.map((achievement) => (
                    <AchievementItem key={achievement.taskId}>
                        <CheckIcon>
                            <Check size={20} />
                        </CheckIcon>
                        <TaskInfo>
                            <TaskTitle>{achievement.title}</TaskTitle>
                        </TaskInfo>
                        <TimeSpent>
                            <Clock size={14} />
                            {formatDuration(achievement.timeSpent)}
                        </TimeSpent>
                    </AchievementItem>
                ))}
            </List>
        </Container>
    );
};
