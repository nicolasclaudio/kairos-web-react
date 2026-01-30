import React from 'react';
import styled from 'styled-components';

interface CircularProgressProps {
    progress: number;  // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
}

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border};
`;

const CircleProgress = styled.circle<{ $progress: number; $color: string }>`
  fill: none;
  stroke: ${({ $color }) => $color};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
`;

export const CircularProgress: React.FC<CircularProgressProps> = ({
    progress,
    size = 200,
    strokeWidth = 8,
    color = '#0052FF',
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <Svg width={size} height={size}>
            <CircleBackground
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
            />
            <CircleProgress
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                $progress={progress}
                $color={color}
            />
        </Svg>
    );
};
