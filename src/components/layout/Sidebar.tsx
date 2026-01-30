import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { Inbox, BarChart2, Clock, Settings, Home, Target } from 'lucide-react';

const Container = styled.aside`
  width: 80px;
  height: 100vh;
  background: white;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
`;

const NavItem = styled(Link) <{ $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $active }) => $active ? theme.colors.kairosAzul : theme.colors.textSecondary};
  background: ${({ theme, $active }) => $active ? '#EFF6FF' : 'transparent'};
  margin-bottom: 16px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.kairosAzul};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 24px;
    background: ${({ theme }) => theme.colors.kairosAzul};
    border-radius: 0 4px 4px 0;
    opacity: ${({ $active }) => $active ? 1 : 0};
    transition: opacity 0.2s ease;
  }
`;

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Container>
      <NavItem to="/" $active={location.pathname === '/'} title="Inbox">
        <Home size={24} />
      </NavItem>

      <NavItem to="/plan" $active={location.pathname === '/plan'} title="Plan Diario">
        <Target size={24} />
      </NavItem>

      <NavItem to="/insights" $active={location.pathname === '/insights'} title="Insights">
        <BarChart2 size={24} />
      </NavItem>

      {/* Placeholders for future features */}
      <NavItem to="/timer" $active={location.pathname === '/timer'} title="Timer">
        <Clock size={24} />
      </NavItem>
    </Container>
  );
};
