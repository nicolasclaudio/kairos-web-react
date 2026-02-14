import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Check, Clock } from 'lucide-react';
import { useTimerStore } from '@/store/useTimerStore';
import { formatDuration } from '@/utils/timeUtils';
import type { Task, TaskPriority } from '@/types';
import { useGoalStore } from '../../../stores/useGoalStore';

// Importar animaciones de La Fluidez
const strikeThrough = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const pulseGreen = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 0.15; }
`;

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onClick?: (task: Task) => void;
}

const Card = styled.div<{ $completed: boolean; $isCompleting?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.taskCard};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.quick};
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.taskCardHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $completed }) =>
    $completed &&
    css`
      opacity: 0.7;
    `}

  ${({ $isCompleting, theme }) =>
    $isCompleting &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: ${theme.colors.kairosVerdeEsmeralda};
        opacity: 0;
        border-radius: ${theme.borderRadius.card};
        animation: ${pulseGreen} 400ms ease-out;
        pointer-events: none;
      }
    `}
`;

const PriorityIndicator = styled.div<{ $priority: TaskPriority }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 8px 0 0 8px;
  background-color: ${({ $priority, theme }) => {
    switch ($priority) {
      case 'HIGH':
      case 'URGENT':
        return theme.colors.danger;
      case 'MEDIUM':
        return theme.colors.warning;
      case 'LOW':
      default:
        return theme.colors.primary;
    }
  }};
`;

const Checkbox = styled.button<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ theme, $checked }) =>
    $checked ? theme.colors.kairosVerdeEsmeralda : theme.colors.border};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.kairosVerdeEsmeralda : 'transparent'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.quick};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.kairosVerdeEsmeralda};
    background: ${({ $checked, theme }) =>
    $checked ? theme.colors.kairosVerdeEsmeralda : 'rgba(16, 185, 129, 0.1)'};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    color: white;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.quick};
  }
`;

const TaskContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskTitle = styled.p<{ $completed: boolean }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.textSecondary : theme.colors.text};
  transition: color ${({ theme }) => theme.transitions.quick};
  word-break: break-word;
  position: relative;

  ${({ $completed, theme }) =>
    $completed &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        height: 1.5px;
        background: ${theme.colors.textSecondary};
        width: 100%;
        animation: ${strikeThrough} 300ms ease-out;
      }
    `}
`;

const TimeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const GoalPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 4px;
`;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onClick }) => {
  const isCompleted = task.status === 'DONE';
  const [isCompleting, setIsCompleting] = useState(false);
  const { timeSpent } = useTimerStore();
  const { getGoal } = useGoalStore();
  const taskTimeSpent = timeSpent[task.id] || 0;

  const goal = task.goalId ? getGoal(task.goalId) : undefined;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Animación al completar
    if (!isCompleted) {
      setIsCompleting(true);
      setTimeout(() => {
        setIsCompleting(false);
        onToggle(task.id);
      }, 400); // Duración de la animación pulseGreen
    } else {
      onToggle(task.id);
    }
  };

  const handleCardClick = () => {
    onClick?.(task);
  };

  return (
    <Card $completed={isCompleted} $isCompleting={isCompleting} onClick={handleCardClick}>
      <PriorityIndicator $priority={task.priority} />
      <Checkbox
        $checked={isCompleted}
        onClick={handleCheckboxClick}
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <Check size={16} />
      </Checkbox>
      <TaskContent>
        <TaskTitle $completed={isCompleted}>{task.title}</TaskTitle>

        {goal && (
          <GoalPill title={goal.title}>
            {goal.icon} {goal.title}
          </GoalPill>
        )}

        {taskTimeSpent > 0 && (
          <TimeIndicator>
            <Clock size={12} />
            {formatDuration(taskTimeSpent)}
          </TimeIndicator>
        )}
      </TaskContent>
    </Card>
  );
};
