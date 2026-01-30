import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, X } from 'lucide-react';
import { useTasksStore } from '@/store/useTasksStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  border-radius: 20px;
  border: 2px solid #0052FF;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #0052FF 0%, #0066FF 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 16px rgba(0, 82, 255, 0.2);
`;

const Greeting = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

const DateText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Summary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: #0052FF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0046E0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 82, 255, 0.3);
  }
`;

const BRIEFING_STORAGE_KEY = 'kairos-last-briefing-date';

export const DailyBriefing: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { tasks } = useTasksStore();

    useEffect(() => {
        const lastBriefingDate = localStorage.getItem(BRIEFING_STORAGE_KEY);
        const today = format(new Date(), 'yyyy-MM-dd');

        if (lastBriefingDate !== today) {
            // Show briefing after a small delay
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        localStorage.setItem(BRIEFING_STORAGE_KEY, today);
        setIsOpen(false);
    };

    const todayDate = format(new Date(), "EEEE, d 'de' MMMM", { locale: es });
    const todayTasks = tasks.filter(t => t.plannedAt === format(new Date(), 'yyyy-MM-dd'));
    const highPriorityTasks = tasks.filter(t => t.priority === 'HIGH' && t.status !== 'DONE');
    const pendingTasks = tasks.filter(t => t.status !== 'DONE');

    return (
        <AnimatePresence>
            {isOpen && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <Modal
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <CloseButton onClick={handleClose}>
                            <X size={20} />
                        </CloseButton>

                        <Header>
                            <IconWrapper>
                                <Sun size={32} color="white" />
                            </IconWrapper>
                            <Greeting>¡Buenos días!</Greeting>
                            <DateText>{todayDate}</DateText>
                        </Header>

                        <Summary>
                            <SummaryItem>
                                <Label>Tareas planificadas hoy</Label>
                                <Value>{todayTasks.length}</Value>
                            </SummaryItem>
                            <SummaryItem>
                                <Label>Prioridades altas</Label>
                                <Value>{highPriorityTasks.length}</Value>
                            </SummaryItem>
                            <SummaryItem>
                                <Label>Tareas pendientes</Label>
                                <Value>{pendingTasks.length}</Value>
                            </SummaryItem>
                        </Summary>

                        <ActionButton onClick={handleClose}>
                            Comenzar el día
                        </ActionButton>
                    </Modal>
                </Overlay>
            )}
        </AnimatePresence>
    );
};
