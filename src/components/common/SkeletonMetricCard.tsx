import styled from 'styled-components';
import { SkeletonCard } from './SkeletonCard';

const SkeletonMetricWrapper = styled.div`
    background: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.card};
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: ${props => props.theme.shadows.sm};
`;

const SkeletonHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const SkeletonIcon = styled(SkeletonCard)`
    flex-shrink: 0;
`;

/**
 * SkeletonMetricCard Component
 * 
 * Skeleton screen para MetricCard (Insights Dashboard).
 * Simula icono + valor numérico + label.
 */
export const SkeletonMetricCard = () => {
    return (
        <SkeletonMetricWrapper>
            <SkeletonHeader>
                {/* Icono circular */}
                <SkeletonIcon height="40px" width="40px" borderRadius="50%" />

                {/* Label de la métrica */}
                <SkeletonCard height="18px" width="120px" />
            </SkeletonHeader>

            {/* Valor numérico grande */}
            <SkeletonCard height="32px" width="80px" />

            {/* Descripción o cambio */}
            <SkeletonCard height="14px" width="60%" />
        </SkeletonMetricWrapper>
    );
};
