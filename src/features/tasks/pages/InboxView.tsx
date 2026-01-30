import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { QuickAddInput } from '../components/QuickAddInput';
import { TaskList } from '../components/TaskList';
import { TaskDrawer } from '../components/TaskDrawer';
import { useTasksStore } from '@/store/useTasksStore';
import type { Task } from '@/types';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.offWhite};
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.slateGray};
  margin: 0;
`;

export const InboxView: React.FC = () => {
  const {
    tasks,
    selectedTaskId,
    isDrawerOpen,
    addTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
    openDrawer,
    closeDrawer,
  } = useTasksStore();

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  const selectedTask = tasks.find(t => t.id === selectedTaskId) || null;

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      status: 'TODO',
      priority: 'MEDIUM',  // Default to medium (Ambar)
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTask(newTask);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>Kairos / Inbox</Title>
          <Subtitle>{today}</Subtitle>
        </Header>

        <QuickAddInput onAdd={handleAddTask} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTaskComplete}
          onTaskClick={(task) => openDrawer(task.id)}
        />
      </ContentWrapper>

      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onUpdate={updateTask}
        onComplete={toggleTaskComplete}
        onDelete={deleteTask}
      />
    </PageContainer>
  );
};
