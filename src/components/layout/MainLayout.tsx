import { useState } from 'react';
import { Outlet } from 'react-router';

import { Header, Sidebar, Toaster } from '@/components';
import { HEADER_HEIGHT } from '@/constants/layout';
import { cn } from '@/utils';

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1F2E]">
      <Header onMenuClick={() => setIsOpen(prev => !prev)} />

      <div className="flex" style={{ paddingTop: HEADER_HEIGHT }}>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <main
          className={cn(
            'flex-1 transition-all duration-300',
            isOpen ? 'ml-60' : 'ml-0',
          )}
        >
          <Outlet />
        </main>
      </div>

      <Toaster className="dark" position="top-center" />
    </div>
  );
}
