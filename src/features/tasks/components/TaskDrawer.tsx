import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X, Trash2, Check, Clock } from 'lucide-react';
import { PrioritySelector } from './PrioritySelector';
import { TagInput } from './TagInput';
import { Overlay } from '@/components/common/Overlay';
import { useTimerStore } from '@/store/useTimerStore';
import { minutesToSeconds } from '@/utils/timeUtils';
import type { Task, TaskPriority } from '@/types';
import { useGoalStore } from '../../../stores/useGoalStore';

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const DrawerContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 50;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

const TimerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: #0046db;
  }
`;

const TitleInput = styled.input`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  background: transparent;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xs} 0;

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const DateInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: space-between;
`;

const CompleteButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.success};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: #059669;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.danger};
    color: white;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  background: transparent;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TaskDrawer: React.FC<TaskDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate,
  onComplete,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [tags, setTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [goalId, setGoalId] = useState<string | undefined>(undefined);
  const { goals } = useGoalStore();
  const { startSession } = useTimerStore();

  // Update local state when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setTags(task.tags || []);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setGoalId(task.goalId);
    }
  }, [task]);

  // Auto-save changes with debounce
  useEffect(() => {
    if (!task) return;

    const timeout = setTimeout(() => {
      onUpdate(task.id, {
        title,
        description,
        priority,
        tags,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        goalId,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, description, priority, tags, dueDate, goalId, task, onUpdate]);

  const handleComplete = () => {
    if (task) {
      onComplete(task.id);
      onClose();
    }
  };

  const handleDelete = () => {
    if (task && confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleStartTimer = () => {
    if (task) {
      startSession(task.id, task.title, minutesToSeconds(25));
      onClose();
    }
  };

  if (!task) return null;

  const isCompleted = task.status === 'DONE';

  return (
    <>
      <Overlay isVisible={isOpen} onClick={onClose} />
      <DrawerContainer $isOpen={isOpen} onKeyDown={handleKeyDown}>
        <Header>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
          />
          <HeaderActions>
            <TimerButton onClick={handleStartTimer}>
              <Clock size={16} />
              Focus
            </TimerButton>
            <CloseButton onClick={onClose} aria-label="Close">
              <X size={20} />
            </CloseButton>
          </HeaderActions>
        </Header>

        <Content>
          <Section>
            <Label>Priority</Label>
            <PrioritySelector value={priority} onChange={setPriority} />
          </Section>

          <Section>
            <Label>Goal</Label>
            <StyledSelect
              value={goalId || ''}
              onChange={(e) => setGoalId(e.target.value || undefined)}
            >
              <option value="">No Goal Linked</option>
              {goals.map(g => (
                <option key={g.id} value={g.id}>
                  {g.icon} {g.title}
                </option>
              ))}
            </StyledSelect>
          </Section>

          <Section>
            <Label>Notes</Label>
            <NotesTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any notes or context for this task..."
            />
          </Section>

          <Section>
            <Label>Due Date</Label>
            <DateInput
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Section>

          <Section>
            <Label>Tags</Label>
            <TagInput tags={tags} onChange={setTags} />
          </Section>
        </Content>

        <Footer>
          <CompleteButton onClick={handleComplete} disabled={isCompleted}>
            <Check size={20} />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </CompleteButton>
          <DeleteButton onClick={handleDelete} aria-label="Delete task">
            <Trash2 size={20} />
          </DeleteButton>
        </Footer>
      </DrawerContainer>
    </>
  );
};
