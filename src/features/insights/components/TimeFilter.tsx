import React from 'react';
import styled from 'styled-components';
import type { TimeFilter } from '@/types/analytics';

interface TimeFilterProps {
    value: TimeFilter;
    onChange: (value: TimeFilter) => void;
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.offWhite};
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background: ${({ $active, theme }) =>
        $active ? theme.colors.azulKairos : 'transparent'};
  color: ${({ $active, theme }) =>
        $active ? 'white' : theme.colors.text};

  &:hover {
    background: ${({ $active, theme }) =>
        $active ? theme.colors.azulKairos : theme.colors.border};
  }
`;

export const TimeFilterComponent: React.FC<TimeFilterProps> = ({ value, onChange }) => {
    return (
        <Container>
            <FilterButton
                $active={value === 'week'}
                onClick={() => onChange('week')}
            >
                This Week
            </FilterButton>
            <FilterButton
                $active={value === 'month'}
                onClick={() => onChange('month')}
            >
                This Month
            </FilterButton>
            <FilterButton
                $active={value === 'all'}
                onClick={() => onChange('all')}
            >
                All Time
            </FilterButton>
        </Container>
    );
};
