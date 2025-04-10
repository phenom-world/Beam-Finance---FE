import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import CustomersIcon from '../../assets/svgs/customers';
import HelpIcon from '../../assets/svgs/help';
import LogoutIcon from '../../assets/svgs/logout';
import MarginOrders from '../../assets/svgs/margin-orders';
import NotificationIcon from '../../assets/svgs/notification';
import SpotOrdersIcon from '../../assets/svgs/orders';
import OverviewIcon from '../../assets/svgs/overview';
import SettingsIcon from '../../assets/svgs/settings';
import TransactionsIcon from '../../assets/svgs/transaction';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../auth/Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Overview', href: '#', icon: <OverviewIcon /> },
  { name: 'Customers', href: '#', icon: <CustomersIcon /> },
  { name: 'Spot Orders', href: '#', icon: <SpotOrdersIcon /> },
  { name: 'Margin Orders', href: '#', icon: <MarginOrders /> },
  { name: 'Transactions', href: '#', icon: <TransactionsIcon /> },
  { name: 'Wallet', href: '/wallet', icon: <TransactionsIcon /> },
];

const secondaryNavigation = [
  { name: 'Notification', href: '#', icon: <NotificationIcon /> },
  { name: 'Settings', href: '#', icon: <SettingsIcon /> },
  { name: 'Logout', href: '#', icon: <LogoutIcon /> },
  { name: 'Help', href: '#', icon: <HelpIcon /> },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className='fixed inset-0 z-40 lg:hidden bg-black bg-opacity-25' onClick={onClose} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 lg:static lg:inset-auto lg:z-auto transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className='flex flex-col w-60 h-full'>
          <div className='flex flex-col flex-1 bg-gray-darker text-white '>
            <div className='flex flex-col pt-5 pb-4 overflow-y-auto '>
              <div className='flex items-center justify-between border-border pb-5 border-b-[0.5px] px-10'>
                <div className='flex items-center'>
                  <Logo className='w-fit' size={6} />
                  <span className='ml-2 text-sm font-semibold'>BEAM</span>
                </div>
                <button
                  onClick={onClose}
                  className='lg:hidden absolute right-4 p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>

              <nav className='mt-8 flex-1 space-y-[49px] px-10'>
                <div className='space-y-1'>
                  <p className='text-xs font-semibold text-beam-300 uppercase tracking-[1px]'>
                    MAIN
                  </p>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className={`
                          group flex items-center py-2 text-xs font-medium rounded-md
                          ${
                            location.pathname === item.href
                              ? 'text-primary font-medium'
                              : 'text-beam-300 hover:text-gray-lighter'
                          }
                        `}
                      >
                        {Icon} <span className='ml-3'>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className='space-y-1 pt-[61px] border-border border-t-[0.5px]'>
                  <div className='space-y-1'>
                    <p className='text-xs font-semibold text-beam-300 uppercase tracking-[1px]'>
                      OTHERS
                    </p>
                    {secondaryNavigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => {
                            if (item.name === 'Logout') {
                              logout();
                            }
                            onClose();
                          }}
                          className={`
                          group flex items-center py-2 text-xs font-medium rounded-md
                          ${
                            location.pathname === item.href
                              ? 'text-primary font-medium '
                              : 'text-beam-300 hover:text-gray-lighter'
                          }
                        `}
                        >
                          {Icon} <span className='ml-3'>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
            <div className='mx-5 mt-28'>
              <button className='flex items-center space-x-2 text-sm bg-white rounded-md px-5 py-2'>
                <span className='text-gray-darker text-[10px]'>Switch to dark mode</span>
                <div className='w-10 h-6 bg-[#D1D1E0] rounded-full p-1'>
                  <div className='w-4 h-4 bg-white rounded-full shadow-lg'></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
