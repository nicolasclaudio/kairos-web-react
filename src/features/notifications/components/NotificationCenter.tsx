import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, Trash2 } from 'lucide-react';
import { useNotificationStore } from '../stores/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
`;

const Panel = styled(motion.div)`
  position: fixed;
  top: 60px;
  right: 24px;
  width: 400px;
  max-height: calc(100vh - 80px);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    right: 16px;
    left: 16px;
    width: auto;
  }
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

const NotificationItem = styled.div<{ $read: boolean }>`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ $read, theme }) => $read ? 'transparent' : 'rgba(0, 82, 255, 0.03)'};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border- bottom: none;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 4px;
`;

const NotificationIcon = styled.div<{ $type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1rem;
  background: ${({ $type }) => {
        switch ($type) {
            case 'info': return 'rgba(0, 82, 255, 0.1)';
            case 'success': return 'rgba(16, 185, 129, 0.1)';
            case 'warning': return 'rgba(245, 158, 11, 0.1)';
            case 'error': return 'rgba(225, 29, 72, 0.1)';
            default: return 'rgba(0, 82, 255, 0.1)';
        }
    }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

const NotificationMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const NotificationTime = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const NotificationCenter: React.FC = () => {
    const {
        notifications,
        isNotificationCenterOpen,
        closeNotificationCenter,
        markAsRead,
        markAllAsRead,
        clearNotifications,
    } = useNotificationStore();

    const handleNotificationClick = (id: string) => {
        markAsRead(id);
    };

    return (
        <AnimatePresence>
            {isNotificationCenterOpen && (
                <>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeNotificationCenter}
                    />
                    <Panel
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <Header>
                            <Title>Notificaciones</Title>
                            <Actions>
                                <ActionButton onClick={markAllAsRead} title="Marcar todo como leído">
                                    <CheckCheck size={18} />
                                </ActionButton>
                                <ActionButton onClick={clearNotifications} title="Limpiar todo">
                                    <Trash2 size={18} />
                                </ActionButton>
                            </Actions>
                        </Header>
                        <NotificationList>
                            {notifications.length === 0 ? (
                                <EmptyState>No tienes notificaciones</EmptyState>
                            ) : (
                                notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        $read={notification.read}
                                        onClick={() => handleNotificationClick(notification.id)}
                                    >
                                        <NotificationHeader>
                                            <NotificationIcon $type={notification.type}>
                                                {notification.icon || '🔔'}
                                            </NotificationIcon>
                                            <NotificationContent>
                                                <NotificationTitle>{notification.title}</NotificationTitle>
                                                <NotificationMessage>{notification.message}</NotificationMessage>
                                                <NotificationTime>
                                                    {formatDistanceToNow(new Date(notification.timestamp), {
                                                        addSuffix: true,
                                                        locale: es,
                                                    })}
                                                </NotificationTime>
                                            </NotificationContent>
                                        </NotificationHeader>
                                    </NotificationItem>
                                ))
                            )}
                        </NotificationList>
                    </Panel>
                </>
            )}
        </AnimatePresence>
    );
};
