import { Menu } from 'lucide-react';

import ArrowDownIcon from '../../assets/svgs/arrow-down';
import NotifyIcon from '../../assets/svgs/notify';
import SearchIcon from '../../assets/svgs/search';
import { useGetMe } from '../../hooks/api/auth';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { data } = useGetMe();
  return (
    <header className='bg-white border-b-[0.5px] border-border'>
      <div className='flex justify-between items-center py-3 sm:py-3.5 px-4 sm:px-8'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <button
            onClick={onMenuClick}
            className='lg:hidden p-1.5 sm:p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'
          >
            <Menu className='h-5 w-5 sm:h-6 sm:w-6' />
          </button>
          <div className='flex-1 flex'>
            <div className='w-full max-w-[200px] sm:max-w-lg lg:w-[328px]'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none'>
                  <div className='h-4 w-4 sm:h-5 sm:w-5'>
                    <SearchIcon />
                  </div>
                </div>
                <input
                  id='search'
                  name='search'
                  className='block w-full rounded-full bg-gray-lighter pl-2 sm:pl-3 pr-8 sm:pr-10 py-1.5 sm:py-2 leading-5 placeholder-[#627B87] focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary text-xs'
                  placeholder='Search'
                  type='text'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-3 sm:gap-6'>
          <div className='flex items-center'>
            <div className='h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#FFE6CC] flex items-center justify-center'>
              <span className='text-gray-600 font-medium text-sm sm:text-base'>
                {data?.data.fullName.charAt(0)}
              </span>
            </div>
            <span className='flex text-xs font-medium text-gray-700 sm:mr-7 ml-3 gap-2 items-center justify-center'>
              <span className='hidden sm:inline'>{data?.data.fullName}</span> <ArrowDownIcon />
            </span>
          </div>
          <div className='h-5 w-5 sm:h-6 sm:w-6'>
            <NotifyIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
