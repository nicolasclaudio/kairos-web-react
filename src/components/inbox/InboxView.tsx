import React from 'react';
import styled from 'styled-components';
import { QuickAddInput } from '../common/QuickAddInput';
import { TaskList } from './TaskList';
import { useTasksStore } from '@/store/useTasksStore';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  margin: 0;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(220, 38, 38, 0.1);
  border-left: 4px solid #DC2626;
  border-radius: 8px;
  color: #DC2626;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.kairosSlateGray};
`;

export const InboxView: React.FC = () => {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    toggleTask
  } = useTasksStore();

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return now.toLocaleDateString('es-ES', options);
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>Kairos / Inbox</Title>
          <Subtitle>{getCurrentDate()}</Subtitle>
        </Header>

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <QuickAddInput
          onAdd={addTask}
          isLoading={isLoading}
        />

        {isLoading && tasks.length === 0 ? (
          <LoadingSpinner>Cargando tareas...</LoadingSpinner>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
          />
        )}
      </Content>
    </Container>
  );
};
