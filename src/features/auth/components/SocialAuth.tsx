import React from 'react';
import styled from 'styled-components';
import { Github, Chrome } from 'lucide-react'; // Assuming lucide-react is installed, if not will use text or svg
import { KairosButton } from './ButtonComponents';

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: 0.875rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
  
  span {
    padding: 0 10px;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialAuth: React.FC = () => {
    return (
        <>
            <Divider>
                <span>O continúa con</span>
            </Divider>
            <ButtonsRow>
                <KairosButton type="button" $variant="outline" $fullWidth>
                    <Chrome size={18} /> Google
                </KairosButton>
                <KairosButton type="button" $variant="outline" $fullWidth>
                    <Github size={18} /> GitHub
                </KairosButton>
            </ButtonsRow>
        </>
    );
};
