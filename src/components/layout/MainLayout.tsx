import { useState } from 'react';
import { Outlet } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <Toaster className="dark" position="top-center" />
    </div>
  );
}
