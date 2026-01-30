import React from 'react';
import styled from 'styled-components';
import { TaskCard } from './TaskCard';
import type { Task } from '@/types';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onTaskClick?: (task: Task) => void;
    isLoading?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptyDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  margin: 0;
`;

const LoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SkeletonCard = styled.div`
  height: 64px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggle,
    onTaskClick,
    isLoading = false,
}) => {
    if (isLoading) {
        return (
            <LoadingSkeleton>
                {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </LoadingSkeleton>
        );
    }

    if (tasks.length === 0) {
        return (
            <EmptyState>
                <EmptyTitle>No tasks yet</EmptyTitle>
                <EmptyDescription>
                    Start by adding your first task using the input above
                </EmptyDescription>
            </EmptyState>
        );
    }

    return (
        <Container>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onClick={onTaskClick}
                />
            ))}
        </Container>
    );
};
