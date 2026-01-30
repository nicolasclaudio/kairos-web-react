import React from 'react';
import styled from 'styled-components';

interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: string;
    trend?: number;
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.slateGray};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const IconContainer = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Value = styled.div<{ $color: string }>`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $color }) => $color};
  line-height: 1;
`;

const Trend = styled.span<{ $positive: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ $positive, theme }) =>
        $positive ? theme.colors.verdeEsmeralda : theme.colors.rojoCarmesi};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    icon,
    color = '#0052FF',
    trend
}) => {
    return (
        <Card>
            <Header>
                <Title>{title}</Title>
                <IconContainer $color={color}>{icon}</IconContainer>
            </Header>
            <Value $color={color}>{value}</Value>
            {trend !== undefined && (
                <Trend $positive={trend >= 0}>
                    {trend >= 0 ? '+' : ''}{trend}%
                </Trend>
            )}
        </Card>
    );
};
