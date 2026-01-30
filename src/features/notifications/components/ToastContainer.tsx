import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';
import { useNotificationStore } from '../stores/useNotificationStore';

const Container = styled.div`
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    right: 16px;
    left: 16px;
    top: 60px;

    > * {
      max-width: 100%;
    }
  }
`;

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useNotificationStore();

    return (
        <Container>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} notification={toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </Container>
    );
};
