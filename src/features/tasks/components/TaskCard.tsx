import React from 'react';
import styled, { css } from 'styled-components';
import { Check, Clock } from 'lucide-react';
import { useTimerStore } from '@/store/useTimerStore';
import { formatDuration } from '@/utils/timeUtils';
import type { Task, TaskPriority } from '@/types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onClick?: (task: Task) => void;
}

const Card = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.taskCard};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.taskCardHover};
    transform: translateY(-2px);
  }

  ${({ $completed, theme }) =>
    $completed &&
    css`
      opacity: 0.7;
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
        return theme.colors.rojoCarmesi;
      case 'MEDIUM':
        return theme.colors.ambar;
      case 'LOW':
      default:
        return theme.colors.azulKairos;
    }
  }};
`;

const Checkbox = styled.button<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ theme, $checked }) =>
    $checked ? theme.colors.verdeEsmeralda : theme.colors.border};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.verdeEsmeralda : 'transparent'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.verdeEsmeralda};
  }

  svg {
    color: white;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transitions.fast};
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
    $completed ? theme.colors.slateGray : theme.colors.text};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  transition: all ${({ theme }) => theme.transitions.base};
  word-break: break-word;
`;

const TimeIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.slateGray};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onClick }) => {
  const isCompleted = task.status === 'DONE';
  const { timeSpent } = useTimerStore();
  const taskTimeSpent = timeSpent[task.id] || 0;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  const handleCardClick = () => {
    onClick?.(task);
  };

  return (
    <Card $completed={isCompleted} onClick={handleCardClick} className="animate-fade-up">
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
