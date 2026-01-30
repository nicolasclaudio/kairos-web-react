import React from 'react';
import styled from 'styled-components';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.kairosAzul};
  line-height: 1;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Subtext = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-top: 4px;
`;

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, subtext }) => {
  return (
    <Card>
      <Value>{value}</Value>
      <Label>{label}</Label>
      {subtext && <Subtext>{subtext}</Subtext>}
    </Card>
  );
};
