'use client';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import toast, { resolveValue, Toaster } from 'react-hot-toast';

import { capitalize, cn } from '../util/helper';

const toastStyles = cva(
  'px-4 py-[19px] w-[366px] flex items-center justify-between gap-3 rounded-2xl text-black border',
  {
    variants: {
      intent: {
        error: 'bg-white border-red-500',
        success: 'bg-white border-green-500',
        loading: 'bg-white border-yellow-500',
        custom: '',
        blank: '',
      },
    },
    defaultVariants: {
      intent: 'success',
    },
  }
);

const Toast = () => {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 1000,
      }}
      containerClassName='!top-[5px] !right-[5px] font-serif'
    >
      {(t) => {
        const str = resolveValue(t.message, t) as string;
        const [title, message] = str.split('|');
        return (
          <div className={`${toastStyles({ intent: t.type })}`}>
            <div className='flex items-center'>
              <div
                className={cn(
                  'mr-4 rounded-full p-[6px]',
                  t.type === 'success'
                    ? 'bg-green-500'
                    : t.type === 'loading'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                )}
              >
                {t.type === 'success' ? (
                  <svg
                    data-testid='success-icon'
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8.33334 2.5L3.75001 7.08333L1.66667 5'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                ) : (
                  t.type === 'error' && (
                    <svg
                      data-testid='error-icon'
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M5 3.33333V5M5 6.66667H5.00833M9.16667 5C9.16667 7.30119 7.30119 9.16667 5 9.16667C2.69881 9.16667 0.833333 7.30119 0.833333 5C0.833333 2.69881 2.69881 0.833333 5 0.833333C7.30119 0.833333 9.16667 2.69881 9.16667 5Z'
                        stroke='white'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )
                )}
                {t.type === 'loading' && (
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 2V6L8 8M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z'
                      stroke='white'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
              </div>
              <div className='flex flex-col'>
                {message && <p className='text-[13px] font-bold'>{title}</p>}
                <p className='text-[13px] font-normal text-[#71717a]'>
                  {message ? capitalize(message) : capitalize(title)}
                </p>
              </div>
            </div>
            <div onClick={() => toast.remove(t.id)} className='cursor-pointer p-1'>
              <XIcon />
            </div>
          </div>
        );
      }}
    </Toaster>
  );
};

export { Toast };
