import { useState } from 'react';
import { Outlet } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setIsOpen(!isOpen)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Toaster className="dark" position="top-center" />
    </div>
  );
}
