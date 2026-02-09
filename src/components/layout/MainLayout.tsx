import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header, Sidebar, Toaster } from '@/components';
import { HEADER_HEIGHT } from '@/constants/layout';
import { cn } from '@/utils';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#1A1F2E]">
      <Header onMenuClick={() => setIsSidebarOpen(prev => !prev)} />

      <div className="flex" style={{ paddingTop: HEADER_HEIGHT }}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={cn(
            'flex-1 transition-all duration-300',
            isSidebarOpen ? 'ml-0 md:ml-sidebar' : 'ml-0',
          )}
        >
          <Outlet context={isSidebarOpen} />
        </main>
      </div>

      <Toaster className="dark" position="top-center" />
    </div>
  );
}
