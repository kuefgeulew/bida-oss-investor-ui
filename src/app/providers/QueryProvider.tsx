// 🔄 REACT QUERY PROVIDER — Global Data Fetching & Caching
// PHASE 5: Enables real-time backend integration across entire platform

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

/**
 * Create QueryClient with optimized defaults
 */
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Global defaults for all queries
        staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
        gcTime: 30 * 60 * 1000, // 30 minutes - cache garbage collection (formerly cacheTime)
        refetchOnWindowFocus: false, // Don't refetch on window focus (performance)
        refetchOnReconnect: true, // Refetch when internet reconnects
        retry: 3, // Retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      },
      mutations: {
        // Global defaults for all mutations
        retry: 1, // Retry failed mutations once
      },
    },
  });
}

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider - Wraps app with React Query context
 * 
 * USAGE:
 * Wrap your app with this provider to enable all React Query hooks
 * 
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // Create QueryClient only once per app instance
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools - only shown in development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

/**
 * Create a standalone QueryClient for use outside React tree
 * (e.g., in API services, middleware, etc.)
 */
export const queryClient = createQueryClient();
