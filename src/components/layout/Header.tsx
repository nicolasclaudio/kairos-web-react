import React from 'react';
import styled from 'styled-components';
import { NotificationBadge } from '@/features/notifications';

const HeaderContainer = styled.header`
  height: 60px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface HeaderProps {
    title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Kairos' }) => {
    return (
        <HeaderContainer>
            <Title>{title}</Title>
            <Actions>
                <NotificationBadge />
            </Actions>
        </HeaderContainer>
    );
};
