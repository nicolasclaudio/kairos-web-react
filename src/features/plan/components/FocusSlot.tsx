import React from 'react';
import styled from 'styled-components';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '../../../types';

const SlotContainer = styled.div<{ $isOver: boolean; $hasTask: boolean }>`
  background: white;
  border-radius: 16px;
  border: 2px dashed ${({ theme, $isOver }) => $isOver ? theme.colors.kairosAzul : theme.colors.border};
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: ${({ theme, $hasTask }) => $hasTask ? theme.shadows.md : 'none'};
  border-style: ${({ $hasTask }) => $hasTask ? 'solid' : 'dashed'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.kairosAzul};
    transform: translateY(-2px);
  }
`;

const SlotNumber = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
`;

const PlaceholderText = styled.p`
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  font-weight: 500;
`;

interface FocusSlotProps {
    priority: number;
    task?: Task;
    children?: React.ReactNode;
}

export const FocusSlot: React.FC<FocusSlotProps> = ({ priority, task, children }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${priority}`,
        data: { priority, type: 'focus-slot' }
    });

    return (
        <SlotContainer ref={setNodeRef} $isOver={isOver} $hasTask={!!task}>
            <SlotNumber>{priority}</SlotNumber>
            {children ? children : <PlaceholderText>Arrastra aquí tu prioridad #{priority}</PlaceholderText>}
        </SlotContainer>
    );
};
