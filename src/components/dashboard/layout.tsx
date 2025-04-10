import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AuthRoute from '../hoc/auth-route';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthRoute>
      <div className='flex h-screen bg-gray-darker'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className='flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 md:p-10'>
            <Outlet />
          </main>
        </div>
      </div>
    </AuthRoute>
  );
}
