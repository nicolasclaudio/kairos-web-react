import React from 'react';
import styled from 'styled-components';
import { Maximize2 } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { formatTime } from '@/utils/timeUtils';
import { useTimerStore } from '@/store/useTimerStore';

interface TimerWidgetProps {
    timeRemaining: number;
    progress: number;
    isActive: boolean;
    isPaused: boolean;
    onExpand: () => void;
}

const Widget = styled.div<{ $isActive: boolean; $isPaused: boolean }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 30;
  transition: all ${({ theme }) => theme.transitions.base};
  border-radius: 50%;
  
  ${({ $isActive, $isPaused, theme }) =>
        $isActive &&
        !$isPaused &&
        `
    box-shadow: 0 0 20px rgba(0, 82, 255, 0.3);
  `}
  
  ${({ $isPaused, theme }) =>
        $isPaused &&
        `
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
  `}

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    bottom: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeDisplay = styled.div<{ $isPaused: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $isPaused }) => ($isPaused ? theme.colors.ambar : theme.colors.charcoal)};
  text-align: center;
`;

const ExpandIcon = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.offWhite};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  ${Widget}:hover & {
    opacity: 1;
  }
`;

export const TimerWidget: React.FC<TimerWidgetProps> = ({
    timeRemaining,
    progress,
    isActive,
    isPaused,
    onExpand,
}) => {
    if (!isActive) return null;

    const progressColor = isPaused ? '#F59E0B' : '#0052FF';

    return (
        <Widget $isActive={isActive} $isPaused={isPaused} onClick={onExpand}>
            <ProgressContainer>
                <CircularProgress
                    progress={progress}
                    size={100}
                    strokeWidth={6}
                    color={progressColor}
                />
                <TimeDisplay $isPaused={isPaused}>
                    {formatTime(timeRemaining)}
                </TimeDisplay>
                <ExpandIcon>
                    <Maximize2 size={12} />
                </ExpandIcon>
            </ProgressContainer>
        </Widget>
    );
};
