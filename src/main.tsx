import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { setupAxiosInterceptors } from '@/api/api.ts';

import './index.css';

import { useAuthStore } from '@/features/auth/index.ts';

import App from './App.tsx';

const queryClient = new QueryClient();

setupAxiosInterceptors({
  ...useAuthStore.getState(),
  getAccessToken: () => useAuthStore.getState().accessToken,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
