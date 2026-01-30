import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/react-query';
import { lightTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { InboxView } from './components/inbox/InboxView';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <GlobalStyles />
                <InboxView />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
