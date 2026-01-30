import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Task } from '../../../types';

const BarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.kairosOffWhite};
  z-index: 100;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.kairosVerdeEsmeralda};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.kairosVerdeEsmeralda};
`;

interface DailyProgressBarProps {
    tasks: Task[];
}

export const DailyProgressBar: React.FC<DailyProgressBarProps> = ({ tasks }) => {
    const progress = useMemo(() => {
        if (tasks.length === 0) return 0;
        const completed = tasks.filter(t => t.status === 'DONE').length;
        return (completed / tasks.length) * 100;
    }, [tasks]);

    return (
        <BarContainer>
            <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </BarContainer>
    );
};
