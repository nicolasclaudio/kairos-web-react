import { keyframes } from 'styled-components';

/**
 * Sistema de Animaciones para Kairos
 * Todas las animaciones siguen los principios de La Fluidez:
 * - Rápidas (200-300ms)
 * - Naturales (ease-out, ease-in-out)
 * - Sutiles (pequeños desplazamientos, opacity suave)
 */

// ============================================
// PAGE TRANSITIONS
// ============================================

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ============================================
// SKELETON SCREENS
// ============================================

export const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// ============================================
// MICRO-INTERACCIONES
// ============================================

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

// Animación de tachado de izquierda a derecha
export const strikeThrough = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

// Destello verde sutil para feedback de completado
export const pulseGreen = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 0.15;
  }
`;

// Hover elevation
export const hoverElevate = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
`;

// ============================================
// LOADING STATES
// ============================================

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// ============================================
// STAGGER ANIMATIONS (para listas)
// ============================================

// Helper para crear delays escalonados
export const getStaggerDelay = (index: number, baseDelay = 50) => {
    return `${index * baseDelay}ms`;
};
