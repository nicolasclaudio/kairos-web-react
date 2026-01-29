import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { queryClient } from './lib/react-query';
import { InboxView } from './features/tasks';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<InboxView />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
