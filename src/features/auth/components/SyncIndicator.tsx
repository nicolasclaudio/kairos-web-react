import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Cloud, CloudOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { useSyncStore } from '../../../stores/useSyncStore';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.kairosOffWhite};
    border-color: ${({ theme }) => theme.colors.kairosAzul};
  }
`;

const IconWrapper = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $status }) => {
        switch ($status) {
            case 'SYNCING': return theme.colors.kairosAzul;
            case 'SAVED': return theme.colors.kairosVerdeEsmeralda;
            case 'ERROR': return theme.colors.kairosRojoCarmesi;
            case 'OFFLINE': return theme.colors.kairosAmbar;
            default: return theme.colors.textTertiary;
        }
    }};

  svg {
    animation: ${({ $status }) => $status === 'SYNCING' ? rotate : 'none'} 2s linear infinite;
  }
`;

export const SyncIndicator: React.FC = () => {
    const { status, sync } = useSyncStore();

    return (
        <Container $status={status} title={`Estado: ${status}`} onClick={() => sync()}>
            <IconWrapper $status={status}>
                {status === 'SYNCING' && <RefreshCw size={14} />}
                {status === 'SAVED' && <Cloud size={14} />}
                {status === 'OFFLINE' && <CloudOff size={14} />}
                {status === 'ERROR' && <AlertTriangle size={14} />}
            </IconWrapper>
            <span>
                {status === 'SYNCING' && 'Sincronizando...'}
                {status === 'SAVED' && 'Guardado'}
                {status === 'OFFLINE' && 'Offline'}
                {status === 'ERROR' && 'Error'}
            </span>
        </Container>
    );
};
