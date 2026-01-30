import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/react-query';
import { lightTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { InboxView } from './components/inbox/InboxView';
import { InsightsView } from './features/insights/pages/InsightsView';
import { Sidebar } from './components/layout/Sidebar';

const AppLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 80px; // Sidebar width
  background: ${({ theme }) => theme.colors.background};
`;

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AppLayout>
            <Sidebar />
            <MainContent>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<InboxView />} />
                    <Route path="/insights" element={<InsightsView />} />
                </Routes>
            </MainContent>
        </AppLayout>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyles />
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
