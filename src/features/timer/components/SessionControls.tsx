import React from 'react';
import styled from 'styled-components';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SessionControlsProps {
    isActive: boolean;
    isPaused: boolean;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: center;
`;

const ControlButton = styled.button<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ $color, theme }) => $color || theme.colors.text};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ $color }) => $color};
    border-color: ${({ $color }) => $color};
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SessionControls: React.FC<SessionControlsProps> = ({
    isActive,
    isPaused,
    onPlay,
    onPause,
    onReset,
}) => {
    const handleReset = () => {
        if (confirm('Are you sure you want to reset the timer?')) {
            onReset();
        }
    };

    return (
        <Container>
            {isPaused || !isActive ? (
                <ControlButton $color="#10B981" onClick={onPlay} aria-label="Play">
                    <Play size={24} fill="currentColor" />
                </ControlButton>
            ) : (
                <ControlButton $color="#F59E0B" onClick={onPause} aria-label="Pause">
                    <Pause size={24} fill="currentColor" />
                </ControlButton>
            )}

            <ControlButton $color="#DC2626" onClick={handleReset} aria-label="Reset">
                <RotateCcw size={24} />
            </ControlButton>
        </Container>
    );
};
