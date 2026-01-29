import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { setupAxiosInterceptors } from '@/api/api.ts';

import './index.css';

import { useAuthStore } from '@/features/auth/index.ts';

import App from './App.tsx';

const queryClient = new QueryClient();

// Axios Interceptor 설정 (순환 참조 해결을 위해 분리)
setupAxiosInterceptors({
  ...useAuthStore.getState(),
  getAccessToken: () => useAuthStore.getState().accessToken,
});

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
