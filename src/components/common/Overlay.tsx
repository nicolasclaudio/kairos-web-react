import React from 'react';
import styled from 'styled-components';

interface OverlayProps {
    isVisible: boolean;
    onClick: () => void;
}

const OverlayContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 40;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.base};
`;

export const Overlay: React.FC<OverlayProps> = ({ isVisible, onClick }) => {
    return <OverlayContainer $isVisible={isVisible} onClick={onClick} />;
};
