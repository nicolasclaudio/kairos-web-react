import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { QuickAddInput } from '../components/QuickAddInput';
import { TaskList } from '../components/TaskList';
import { TaskDrawer } from '../components/TaskDrawer';
import { TimerWidget } from '../../timer/components/TimerWidget';
import { FocusMode } from '../../timer/components/FocusMode';
import { useTasksStore } from '@/store/useTasksStore';
import { useTimerStore } from '@/store/useTimerStore';
import { useTimer } from '@/hooks/useTimer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
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
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const InboxView: React.FC = () => {
  const {
    tasks,
    selectedTaskId,
    isDrawerOpen,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    openDrawer,
    closeDrawer,
  } = useTasksStore();

  const {
    activeTaskId,
    activeTaskTitle,
    isInFocusMode,
    toggleFocusMode,
    endSession,
  } = useTimerStore();

  const {
    timeRemaining,
    isActive,
    isPaused,
    isCompleted,
    progress,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  } = useTimer();

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  const selectedTask = tasks.find(t => t.id === selectedTaskId) || null;

  // Start timer when session begins
  React.useEffect(() => {
    const { activeTaskId, duration } = useTimerStore.getState();
    if (activeTaskId && duration > 0) {
      startTimer(duration);
    }
  }, [useTimerStore.getState().activeTaskId]);

  // Handle timer completion
  React.useEffect(() => {
    if (isCompleted && activeTaskId) {
      const { duration } = useTimerStore.getState();
      endSession(duration);
    }
  }, [isCompleted, activeTaskId, endSession]);

  const handleAddTask = (title: string) => {
    addTask(title);
  };

  const handlePlay = () => {
    if (isPaused) {
      resumeTimer();
    } else if (!isActive) {
      const { duration } = useTimerStore.getState();
      startTimer(duration);
    }
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
          onToggle={toggleTask}
          onTaskClick={(task) => openDrawer(task.id)}
        />
      </ContentWrapper>

      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onUpdate={updateTask}
        onComplete={toggleTask}
        onDelete={deleteTask}
      />

      <TimerWidget
        timeRemaining={timeRemaining}
        progress={progress}
        isActive={isActive}
        isPaused={isPaused}
        onExpand={toggleFocusMode}
      />

      <FocusMode
        isOpen={isInFocusMode}
        timeRemaining={timeRemaining}
        taskTitle={activeTaskTitle || ''}
        isActive={isActive}
        isPaused={isPaused}
        isCompleted={isCompleted}
        onClose={toggleFocusMode}
        onPlay={handlePlay}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
    </PageContainer>
  );
};
