import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Notification } from '../types/notification';

const ToastWrapper = styled(motion.div) <{ $type: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-left: 4px solid ${({ theme, $type }) => {
        switch ($type) {
            case 'info': return '#0052FF';
            case 'success': return '#10B981';
            case 'warning': return '#F59E0B';
            case 'error': return '#E11D48';
            default: return theme.colors.primary;
        }
    }};
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 320px;
  max-width: 420px;
  position: relative;
`;

const IconWrapper = styled.div<{ $type: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.125rem;
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

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const Message = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

interface ToastProps {
    notification: Notification;
    onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
    return (
        <ToastWrapper
            $type={notification.type}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <IconWrapper $type={notification.type}>
                {notification.icon || '🔔'}
            </IconWrapper>
            <Content>
                <Title>{notification.title}</Title>
                <Message>{notification.message}</Message>
            </Content>
            <CloseButton onClick={() => onClose(notification.id)}>
                <X size={16} />
            </CloseButton>
        </ToastWrapper>
    );
};
