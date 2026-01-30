import React from 'react';
import styled from 'styled-components';
import { Sidebar } from '../../components/layout/Sidebar';
import { SyncIndicator } from '../../features/auth/components/SyncIndicator';
import { NotificationBadge } from '../../features/notifications';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  pointer-events: none; /* Let clicks pass through to content if header is transparent over it */
  z-index: 50;

  & > * {
    pointer-events: auto;
  }
`;

export const DashboardLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar />
            <MainContent>
                <Header>
                    <NotificationBadge />
                    <SyncIndicator />
                </Header>
                <div style={{ marginTop: 60 }}> {/* Spacing for header */}
                    <Outlet />
                </div>
            </MainContent>
        </LayoutContainer>
    );
};
