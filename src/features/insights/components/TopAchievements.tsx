import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getTopAchievements } from '../../../utils/analyticsUtils';
import type { Task } from '../../../types';

interface TopAchievementsProps {
  tasks: Task[];
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  grid-column: span 2; 
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.kairosVerdeEsmeralda};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
`;

const AchievementMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  display: flex;
  gap: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 20px;
  font-style: italic;
`;

export const TopAchievements: React.FC<TopAchievementsProps> = ({ tasks }) => {
  const achievements = useMemo(() => getTopAchievements(tasks), [tasks]);

  if (achievements.length === 0) {
    return (
      <Container>
        <Title>Grandes Victorias</Title>
        <EmptyState>Completa tareas complejas para verlas aquí 🎉</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Grandes Victorias</Title>
      <List>
        {achievements.map((achievement) => (
          <Item key={achievement.taskId}>
            <CheckCircle>
              <Check size={14} strokeWidth={3} />
            </CheckCircle>
            <Content>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementMeta>
                <span>{achievement.timeSpent} min</span>
                <span>•</span>
                <span>{format(achievement.completedAt, "d 'de' MMMM", { locale: es })}</span>
              </AchievementMeta>
            </Content>
          </Item>
        ))}
      </List>
    </Container>
  );
};
