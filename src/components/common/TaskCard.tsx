import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Check } from 'lucide-react';
import type { Task, TaskPriority } from '../../types';
import { useGoalStore } from '../../stores/useGoalStore';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface CardProps {
  $priority: TaskPriority;
  $completed: boolean;
}

const Card = styled.div<CardProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${({ theme, $priority }) =>
    $priority === 'HIGH'
      ? theme.colors.priorityHigh
      : $priority === 'MEDIUM'
        ? theme.colors.priorityMedium
        : theme.colors.priorityLow
  };
  box-shadow: ${({ theme }) => theme.shadows.taskCard};
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${fadeUp} 0.3s ease-out;
  cursor: pointer;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.taskCardHover};
    transform: translateY(-2px);
  }

  opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};
`;

interface CheckboxProps {
  $checked: boolean;
}

const Checkbox = styled.button<CheckboxProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ theme, $checked }) =>
    $checked ? theme.colors.kairosVerdeEsmeralda : theme.colors.border
  };
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.kairosVerdeEsmeralda : 'transparent'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.kairosVerdeEsmeralda};
    transform: scale(1.1);
  }

  svg {
    color: white;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }
`;

interface TaskTextProps {
  $completed: boolean;
}

const TaskText = styled.div<TaskTextProps>`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.kairosSlateGray : theme.colors.kairosCharcoal
  };
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  text-decoration-color: ${({ theme }) => theme.colors.kairosSlateGray};
  text-decoration-thickness: 1px;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-weight: ${({ $completed }) => ($completed ? 400 : 500)};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MetaScore = styled.span<{ $score: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  background: ${({ $score }) =>
    $score >= 8 ? 'rgba(220, 38, 38, 0.1)' :
      $score >= 5 ? 'rgba(245, 158, 11, 0.1)' :
        'rgba(0, 82, 255, 0.1)'
  };
  color: ${({ $score }) =>
    $score >= 8 ? '#DC2626' :
      $score >= 5 ? '#F59E0B' :
        '#0052FF'
  };
  };
`;

const GoalPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const isCompleted = task.status === 'DONE';
  const { getGoal } = useGoalStore();
  const goal = task.goalId ? getGoal(task.goalId) : undefined;

  return (
    <Card
      $priority={task.priority}
      $completed={isCompleted}
      onClick={(e) => {
        // Only toggle if not clicking the checkbox itself
        if ((e.target as HTMLElement).closest('button')) return;
        onToggle(task.id);
      }}
    >
      <Checkbox
        $checked={isCompleted}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task.id);
        }}
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <Check size={16} />
      </Checkbox>

      <TaskText $completed={isCompleted}>
        {task.title}
      </TaskText>

      {goal && (
        <GoalPill title={goal.title}>
          {goal.icon} {goal.title}
        </GoalPill>
      )}

      <MetaInfo>
        {task.metaScore !== undefined && (
          <MetaScore $score={task.metaScore} title="MetaScore">
            {task.metaScore}
          </MetaScore>
        )}
        {task.estimatedMinutes && (
          <span title="Estimated time">
            {task.estimatedMinutes}min
          </span>
        )}
      </MetaInfo>
    </Card>
  );
};
