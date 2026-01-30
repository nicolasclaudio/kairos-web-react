import React from 'react';
import styled from 'styled-components';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../stores/useNotificationStore';

const BellButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #E11D48;
  color: white;
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;

export const NotificationBadge: React.FC = () => {
    const { unreadCount, toggleNotificationCenter } = useNotificationStore();

    return (
        <BellButton onClick={toggleNotificationCenter} aria-label="Notificaciones">
            <Bell size={20} />
            {unreadCount > 0 && (
                <Badge>{unreadCount > 99 ? '99+' : unreadCount}</Badge>
            )}
        </BellButton>
    );
};
