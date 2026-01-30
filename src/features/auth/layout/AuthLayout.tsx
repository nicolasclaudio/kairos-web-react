import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.kairosAzul} 0%, #2563EB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 420px;
`;

const DecorativeCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  max-width: 400px;
  line-height: 1.2;
  margin: 0;
  position: relative;
  z-index: 10;
`;

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title = "Domina tu tiempo, conquista tus metas." }) => {
    return (
        <Container>
            <LeftPanel>
                <DecorativeCircle
                    style={{ width: 400, height: 400, top: -100, right: -100 }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <DecorativeCircle
                    style={{ width: 600, height: 600, bottom: -200, left: -200 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                />
                <Title>{title}</Title>
            </LeftPanel>
            <RightPanel>
                <ContentWrapper
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </ContentWrapper>
            </RightPanel>
        </Container>
    );
};
