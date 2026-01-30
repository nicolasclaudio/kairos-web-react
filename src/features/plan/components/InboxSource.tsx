import React from 'react';
import styled from 'styled-components';
import { useDraggable, useDroppable } from '@dnd-kit/core'; // Added useDroppable
import { Task } from '../../../types';

const SourceContainer = styled.div`
  width: 300px;
  background: white;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -4px 0 10px rgba(0,0,0,0.02);
`;

const SourceTitle = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  margin-bottom: 24px;
`;

const DraggableItemContainer = styled.div`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  background: white;
  cursor: grab;
  font-size: 0.875rem;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.kairosAzul};
  }

  &:active {
    cursor: grabbing;
    background: ${({ theme }) => theme.colors.kairosOffWhite};
  }
`;

const DraggableTask: React.FC<{ task: Task }> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        data: { task, type: 'inbox-task' }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <DraggableItemContainer ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {task.title}
        </DraggableItemContainer>
    );
};

interface InboxSourceProps {
    tasks: Task[];
}

export const InboxSource: React.FC<InboxSourceProps> = ({ tasks }) => {
    const { setNodeRef } = useDroppable({
        id: 'inbox-list',
        data: { type: 'inbox-source' }
    });

    return (
        <SourceContainer ref={setNodeRef}>
            <SourceTitle>Inbox</SourceTitle>
            {tasks.map(task => (
                <DraggableTask key={task.id} task={task} />
            ))}
        </SourceContainer>
    );
};
