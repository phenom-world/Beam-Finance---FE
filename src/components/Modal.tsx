import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Modal({ isOpen, onClose, title, subtitle, children, size = 'md' }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-150'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-150'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-100'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className='border-b-[#E6E8F0] border-b-[0.5px] pb-4 w-full px-6'>
                  <Dialog.Title
                    as='div'
                    className='flex items-center justify-between text-xl font-medium leading-6 text-gray-900'
                  >
                    <div className='flex flex-col gap-2.5'>
                      <h3 className='font-semibold text-xl'>{title}</h3>
                      {subtitle && <p className='text-lg font-normal text-[#474D66]'>{subtitle}</p>}
                    </div>
                    {!subtitle && (
                      <button onClick={onClose} className='rounded-full p-1 hover:bg-gray-100'>
                        <X className='h-5 w-5' />
                      </button>
                    )}
                  </Dialog.Title>
                </div>
                <div className='mt-6 px-6'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
