import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { X } from 'lucide-react';
import { SessionControls } from './SessionControls';
import { formatTime } from '@/utils/timeUtils';

interface FocusModeProps {
  isOpen: boolean;
  timeRemaining: number;
  taskTitle: string;
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  onClose: () => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

const flash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.base};
`;

const Container = styled.div<{ $isActive: boolean; $isPaused: boolean; $isCompleted: boolean }>`
  max-width: 800px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing['3xl']};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  ${({ $isActive, $isPaused, $isCompleted }) =>
    $isActive &&
    !$isPaused &&
    !$isCompleted &&
    `
    box-shadow: inset 0 0 60px rgba(0, 82, 255, 0.15);
    border-radius: 20px;
  `}
  
  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    animation: ${flash} 1s ease-in-out 3;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const Clock = styled.div<{ $isPaused: boolean; $isCompleted: boolean }>`
  font-size: 120px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $isPaused, $isCompleted }) =>
    $isCompleted
      ? theme.colors.success
      : $isPaused
        ? theme.colors.warning
        : theme.colors.text};
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: color ${({ theme }) => theme.transitions.base};
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const TaskTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: 0;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const CompletionMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
`;

export const FocusMode: React.FC<FocusModeProps> = ({
  isOpen,
  timeRemaining,
  taskTitle,
  isActive,
  isPaused,
  isCompleted,
  onClose,
  onPlay,
  onPause,
  onReset,
}) => {
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isActive && !confirm('Exit focus mode? Your timer will continue in the background.')) {
          return;
        }
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        if (isPaused) {
          onPlay();
        } else {
          onPause();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        onReset();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isActive, isPaused, onClose, onPlay, onPause, onReset]);

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Container
        $isActive={isActive}
        $isPaused={isPaused}
        $isCompleted={isCompleted}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} aria-label="Close focus mode">
          <X size={24} />
        </CloseButton>

        <Clock $isPaused={isPaused} $isCompleted={isCompleted}>
          {formatTime(timeRemaining)}
        </Clock>

        <TaskTitle>{taskTitle}</TaskTitle>

        {isCompleted && (
          <CompletionMessage>
            🎉 Session Complete!
          </CompletionMessage>
        )}

        <SessionControls
          isActive={isActive}
          isPaused={isPaused}
          onPlay={onPlay}
          onPause={onPause}
          onReset={onReset}
        />
      </Container>
    </Overlay>
  );
};
