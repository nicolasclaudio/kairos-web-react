import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import type { TaskPriority } from '../../types';

interface QuickAddInputProps {
  onAdd: (title: string, priority: TaskPriority) => void;
  isLoading?: boolean;
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 12px 16px;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadows.quickAdd};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.kairosAzul};
    box-shadow: 0 4px 12px 0 rgba(0, 82, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.kairosSlateGray};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrioritySelector = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

interface PriorityButtonProps {
  $active: boolean;
  $color: string;
}

const PriorityButton = styled.button<PriorityButtonProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? $color : 'transparent')};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 2px;
  }
`;

export const QuickAddInput: React.FC<QuickAddInputProps> = ({
  onAdd,
  isLoading = false
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority);
      setTitle('');
      setPriority('MEDIUM');
    }
  };

  const priorityColors: Record<TaskPriority, string> = {
    HIGH: '#DC2626',
    MEDIUM: '#F59E0B',
    LOW: '#0052FF',
    URGENT: '#DC2626',
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <IconWrapper>
            <Plus size={20} />
          </IconWrapper>

          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Añadir nueva tarea..."
            disabled={isLoading}
            autoFocus
          />

          <PrioritySelector>
            {(['HIGH', 'MEDIUM', 'LOW'] as TaskPriority[]).map((p) => (
              <PriorityButton
                key={p}
                type="button"
                $active={priority === p}
                $color={priorityColors[p]}
                onClick={() => setPriority(p)}
                aria-label={`Priority ${p}`}
                title={p === 'HIGH' ? 'Alta' : p === 'MEDIUM' ? 'Media' : 'Baja'}
              />
            ))}
          </PrioritySelector>
        </InputWrapper>
      </form>
    </Container>
  );
};
