import { useState } from 'react';

import { Header } from '../layout/Header';
import { Sidebar } from './Sidebar';

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}
