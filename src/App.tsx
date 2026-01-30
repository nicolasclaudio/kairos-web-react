import { ThemeProvider } from 'styled-components';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/react-query';
import { lightTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { InboxView } from './features/tasks/pages/InboxView';
import { InsightsView } from './features/insights/pages/InsightsView';
import { ProtectedRoute } from './features/auth/layout/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PlanView } from './features/plan/pages/PlanView';
import { ToastContainer, NotificationCenter, DailyBriefing } from './features/notifications';
import { GoalsView } from './features/goals/pages/GoalsView';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            }>
                <Route path="/" element={<InboxView />} />
                <Route path="/insights" element={<InsightsView />} />
                <Route path="/plan" element={<PlanView />} />
                <Route path="/goals" element={<GoalsView />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyles />
                <BrowserRouter>
                    <ToastContainer />
                    <NotificationCenter />
                    <DailyBriefing />
                    <AppRoutes />
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
