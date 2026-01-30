import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, subDays, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { generateHeatmapData } from '../../../utils/analyticsUtils';
import type { Task } from '../../../types';

interface ActivityHeatmapProps {
  tasks: Task[];
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.charcoal};
  margin: 0 0 16px 0;
  font-weight: 600;
`;

const Grid = styled.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 8px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface cellprops {
  $intensity: 0 | 1 | 2 | 3 | 4;
}

const Cell = styled.div<cellprops>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ theme, $intensity }) => {
    switch ($intensity) {
      case 0: return theme.colors.offWhite || '#F8FAFC';
      case 1: return '#BFDBFE'; // Light Blue
      case 2: return '#60A5FA'; // Medium Blue
      case 3: return '#2563EB'; // Strong Blue
      case 4: return theme.colors.azulKairos || '#0052FF'; // Kairos Blue
      default: return theme.colors.offWhite;
    }
  }};
  border: 1px solid ${({ theme, $intensity }) =>
    $intensity === 0 ? theme.colors.border : 'transparent'
  };
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
    z-index: 10;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LegendCells = styled.div`
  display: flex;
  gap: 4px;
`;

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ tasks }) => {
  const data = useMemo(() => generateHeatmapData(tasks, 120), [tasks]); // Last 4 months roughly

  // Group by weeks for vertical grid layout (GitHub style)
  const weeks = useMemo(() => {
    const weeksArray: any[] = [];
    let currentWeek: any[] = [];

    data.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === data.length - 1) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
    });
    return weeksArray;
  }, [data]);

  return (
    <Container>
      <Title>Productividad Diaria</Title>

      <Grid>
        {weeks.map((week, i) => (
          <Column key={i}>
            {week.map((day: any) => (
              <Cell
                key={day.date.toISOString()}
                $intensity={day.intensity}
                title={`${format(day.date, 'PPPP', { locale: es })}: ${day.hours}h`}
              />
            ))}
          </Column>
        ))}
      </Grid>

      <Legend>
        <span>Menos</span>
        <LegendCells>
          <Cell $intensity={0} />
          <Cell $intensity={1} />
          <Cell $intensity={2} />
          <Cell $intensity={3} />
          <Cell $intensity={4} />
        </LegendCells>
        <span>Más</span>
      </Legend>
    </Container>
  );
};
