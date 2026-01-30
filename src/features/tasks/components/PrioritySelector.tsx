import React from 'react';
import styled from 'styled-components';
import type { TaskPriority } from '@/types';

interface PrioritySelectorProps {
    value: TaskPriority;
    onChange: (priority: TaskPriority) => void;
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PriorityButton = styled.button<{ $isActive: boolean; $color: string }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ $color, $isActive }) => ($isActive ? $color : '#e5e7eb')};
  background: ${({ $color, $isActive }) => ($isActive ? $color : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? '#ffffff' : theme.colors.text)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ $color }) => $color};
    background: ${({ $color, $isActive }) => ($isActive ? $color : `${$color}10`)};
  }
`;

const priorityColors = {
    LOW: '#0052FF',      // Azul Kairos
    MEDIUM: '#F59E0B',   // Ambar
    HIGH: '#DC2626',     // Rojo Carmesí
    URGENT: '#DC2626',   // Rojo Carmesí
};

const priorityLabels = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent',
};

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({ value, onChange }) => {
    const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

    return (
        <Container>
            {priorities.map((priority) => (
                <PriorityButton
                    key={priority}
                    $isActive={value === priority}
                    $color={priorityColors[priority]}
                    onClick={() => onChange(priority)}
                >
                    {priorityLabels[priority]}
                </PriorityButton>
            ))}
        </Container>
    );
};
