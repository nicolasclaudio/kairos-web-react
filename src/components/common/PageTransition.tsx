import { ReactNode } from 'react';
import styled from 'styled-components';
import { slideUp } from '../../styles/animations';

interface PageTransitionProps {
    children: ReactNode;
}

const TransitionWrapper = styled.div`
    animation: ${slideUp} 250ms ease-out;
    animation-fill-mode: both;
`;

/**
 * PageTransition Component
 * 
 * Wrapper para transiciones suaves entre vistas.
 * Aplica fade-in + slide-up (10px) en 250ms.
 * 
 * Uso:
 * ```tsx
 * <PageTransition>
 *   <InboxView />
 * </PageTransition>
 * ```
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
    return <TransitionWrapper>{children}</TransitionWrapper>;
};
