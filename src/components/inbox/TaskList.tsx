import React from 'react';
import styled from 'styled-components';
import { TaskCard } from '../common/TaskCard';
import type { Task } from '../../types';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete?: (id: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.kairosSlateGray};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  margin: 0;
  max-width: 400px;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  margin: 24px 0 12px 0;
  
  &:first-child {
    margin-top: 0;
  }
`;

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <EmptyState>
                <EmptyTitle>Tu Inbox está limpio</EmptyTitle>
                <EmptyText>
                    Captura tus pendientes rápidamente usando el campo de arriba.
                    Kairos te ayudará a priorizarlos y completarlos.
                </EmptyText>
            </EmptyState>
        );
    }

    const pendingTasks = tasks.filter(t => t.status !== 'DONE');
    const completedTasks = tasks.filter(t => t.status === 'DONE');

    return (
        <Container>
            {pendingTasks.length > 0 && (
                <>
                    <SectionTitle>Pendientes ({pendingTasks.length})</SectionTitle>
                    {pendingTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}

            {completedTasks.length > 0 && (
                <>
                    <SectionTitle>Completadas ({completedTasks.length})</SectionTitle>
                    {completedTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </>
            )}
        </Container>
    );
};
