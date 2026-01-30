import styled from 'styled-components';
import { useGoalStore } from '../../../stores/useGoalStore';
import { GoalCard } from '../components/GoalCard';
import { Plus } from 'lucide-react';
import { KairosButton } from '../../auth/components/ButtonComponents';

const Container = styled.div`
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: white;
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
`;

export const GoalsView = () => {
  const { goals, addGoal } = useGoalStore();

  const handleCreateDemo = () => {
    addGoal({
      title: 'Lanzar Kairos MVP',
      icon: '🚀',
      targetValue: 100,
      metricUnit: '%',
      description: 'Lanzamiento oficial de la versión 1.0'
    });
    addGoal({
      title: 'Libertad Financiera',
      icon: '💰',
      targetValue: 8000,
      metricUnit: 'USD',
      currentValue: 4500
    });
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>Vision Board</Title>
          <Subtitle>Define and track your long-term goals.</Subtitle>
        </div>
        <KairosButton
          onClick={handleCreateDemo}
          $variant="primary"
        >
          <Plus size={20} />
          New Goal
        </KairosButton>
      </Header>

      {goals.length === 0 ? (
        <EmptyState>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#1E293B' }}>No goals defined yet</h3>
          <p style={{ marginBottom: '24px' }}>Create your first goal to start tracking your progress.</p>
          <KairosButton onClick={handleCreateDemo} $variant="secondary">
            Create Demo Goals
          </KairosButton>
        </EmptyState>
      ) : (
        <Grid>
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </Grid>
      )}
    </Container>
  );
};
