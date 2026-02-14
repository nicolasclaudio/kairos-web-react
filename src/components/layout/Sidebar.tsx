import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { BarChart2, Clock, Home, Target, Compass } from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  height: 100vh;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const NavItem = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight + '20' : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.kairosOffWhite};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>
        <span role="img" aria-label="logo">⚓</span> Kairos
      </Logo>

      <NavList>
        <NavItem to="/" $active={location.pathname === '/'}>
          <Home size={20} /> Inbox
        </NavItem>

        <NavItem to="/plan" $active={location.pathname === '/plan'}>
          <Target size={20} /> Plan Diario
        </NavItem>

        <NavItem to="/goals" $active={location.pathname === '/goals'}>
          <Compass size={20} /> Metas
        </NavItem>

        <NavItem to="/insights" $active={location.pathname === '/insights'}>
          <BarChart2 size={20} /> Insights
        </NavItem>

        <NavItem to="/timer" $active={location.pathname === '/timer'}>
          <Clock size={20} /> Timer
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};
