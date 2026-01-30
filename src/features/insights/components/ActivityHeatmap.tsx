import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import type { HeatmapDay } from '@/types/analytics';

interface ActivityHeatmapProps {
    data: HeatmapDay[];
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16px, 1fr));
  gap: 4px;
  max-width: 100%;
`;

const Cell = styled.div<{ $intensity: 0 | 1 | 2 | 3 | 4 }>`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: ${({ $intensity, theme }) => {
        switch ($intensity) {
            case 0: return theme.colors.offWhite;
            case 1: return '#E0EEFF';
            case 2: return '#99CCFF';
            case 3: return '#4D99FF';
            case 4: return theme.colors.azulKairos;
            default: return theme.colors.offWhite;
        }
    }};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    transform: scale(1.2);
    z-index: 10;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.charcoal};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  margin-bottom: 8px;

  ${Cell}:hover & {
    opacity: 1;
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.slateGray};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ data }) => {
    return (
        <Container>
            <Title>Activity Heatmap</Title>
            <HeatmapGrid>
                {data.map((day, index) => (
                    <Cell key={index} $intensity={day.intensity}>
                        <Tooltip>
                            {format(day.date, 'MMM d')}:{' '}
                            {day.hours > 0 ? `${day.hours}h` : 'No activity'}
                        </Tooltip>
                    </Cell>
                ))}
            </HeatmapGrid>
            <Legend>
                <span>Less</span>
                <LegendItem>
                    <Cell $intensity={0} style={{ cursor: 'default' }} />
                </LegendItem>
                <LegendItem>
                    <Cell $intensity={1} style={{ cursor: 'default' }} />
                </LegendItem>
                <LegendItem>
                    <Cell $intensity={2} style={{ cursor: 'default' }} />
                </LegendItem>
                <LegendItem>
                    <Cell $intensity={3} style={{ cursor: 'default' }} />
                </LegendItem>
                <LegendItem>
                    <Cell $intensity={4} style={{ cursor: 'default' }} />
                </LegendItem>
                <span>More</span>
            </Legend>
        </Container>
    );
};
