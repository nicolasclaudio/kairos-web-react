import styled from 'styled-components';
import { shimmer } from '../../styles/animations';

interface SkeletonCardProps {
    height?: string;
    width?: string;
    borderRadius?: string;
}

const SkeletonBase = styled.div<SkeletonCardProps>`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '20px'};
    border-radius: ${props => props.borderRadius || props.theme.borderRadius.md};
    background: linear-gradient(
        90deg,
        ${props => props.theme.colors.background} 0%,
        ${props => props.theme.colors.surfaceHover} 50%,
        ${props => props.theme.colors.background} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s ease-in-out infinite;
`;

/**
 * SkeletonCard Component
 * 
 * Base skeleton component con shimmer gradient animado.
 * Usado para estados de loading elegantes.
 * 
 * @param height - Altura del skeleton
 * @param width - Ancho del skeleton
 * @param borderRadius - Radio de borde (default: 8px)
 */
export const SkeletonCard = ({ height, width, borderRadius }: SkeletonCardProps) => {
    return <SkeletonBase height={height} width={width} borderRadius={borderRadius} />;
};
