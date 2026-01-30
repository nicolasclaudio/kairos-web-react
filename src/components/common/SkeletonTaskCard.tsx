import styled from 'styled-components';
import { SkeletonCard } from './SkeletonCard';

const SkeletonTaskWrapper = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    border-left: 3px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.card};
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: ${props => props.theme.shadows.taskCard};
`;

const SkeletonContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

/**
 * SkeletonTaskCard Component
 * 
 * Skeleton screen específico para TaskCard.
 * Imita la estructura visual de una tarjeta de tarea.
 */
export const SkeletonTaskCard = () => {
    return (
        <SkeletonTaskWrapper>
            <SkeletonContent>
                {/* Título de la tarea */}
                <SkeletonCard height="20px" width="80%" />

                {/* Descripción/metadata */}
                <SkeletonCard height="16px" width="60%" />

                {/* Tags/metadata adicional */}
                <SkeletonCard height="14px" width="40%" />
            </SkeletonContent>
        </SkeletonTaskWrapper>
    );
};
