import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingPageProvider from './Context/loadingContext';
import AppContent from './Components/AppContent/AppContent';
import SearchProvider from './Context/searchContext';
import ThemeProvider from './Context/themeContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <LoadingPageProvider>
      <ThemeProvider>
        <SearchProvider>
          <QueryClientProvider client={queryClient}>
            <AppContent />
          </QueryClientProvider>
        </SearchProvider>
      </ThemeProvider>
    </LoadingPageProvider>
  );
}

export default App;
