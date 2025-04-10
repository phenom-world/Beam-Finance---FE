import React from 'react';

import ArrowLeftIcon from '../assets/svgs/arrow-left';
import ArrowRightIcon from '../assets/svgs/arrow-right';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className='flex items-center justify-end gap-6'>
      <div className='text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>
      <div className='flex'>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-[6px] text-sm ${
                page === currentPage ? 'border-[#FFC130] border' : 'text-[#8C8C89] hover:bg-gray-50'
              } ${page === 1 ? 'rounded-l-md' : ''} ${
                page === Math.min(5, totalPages) ? 'rounded-r-md' : ''
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <div className='flex border border-gray-200 rounded-md overflow-hidden'>
        <button
          className='flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 border-r border-gray-200 disabled:cursor-not-allowed disabled:opacity-40'
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className='flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
