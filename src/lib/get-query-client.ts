import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 60 seconds
        },
      },
    });
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we have
    // a suspense boundary BELOW the creation of the query client
    if (!queryClient) queryClient = new QueryClient();
    return queryClient;
  }
}
