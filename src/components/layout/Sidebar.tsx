import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Inbox, BarChart3 } from 'lucide-react';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: 20;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.azulKairos};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.offWhite};
  }

  &.active {
    background: ${({ theme }) => theme.colors.azulKairos};
    color: white;
  }

  @media (max-width: 768px) {
    justify-content: center;

    span {
      display: none;
    }
  }
`;

export const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <Logo>Kairos</Logo>
            <Nav>
                <NavItem to="/">
                    <Inbox size={20} />
                    <span>Inbox</span>
                </NavItem>
                <NavItem to="/insights">
                    <BarChart3 size={20} />
                    <span>Insights</span>
                </NavItem>
            </Nav>
        </SidebarContainer>
    );
};
