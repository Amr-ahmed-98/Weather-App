import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingPageProvider from './Context/loadingContext';
import AppContent from './Components/AppContent/AppContent';
import SearchProvider from './Context/searchContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <LoadingPageProvider>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </SearchProvider>
    </LoadingPageProvider>
  );
}

export default App;
