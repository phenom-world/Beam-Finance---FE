import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { TransactionStatus, TransactionType } from '../../../types';
import { FilterButton } from './FilterButton';

export const TransactionFilters = () => {
  const [filter, setFilter] = useState<string>('3years');
  const [, setSelectedType] = useState<TransactionType | undefined>();
  return (
    <div className='flex flex-col sm:flex-row sm:items-center mb-5'>
      <div className='overflow-x-auto no-scrollbar whitespace-nowrap pb-2 sm:pb-0 sm:mr-auto'>
        <div className='flex space-x-2 min-w-max text-beam-500'>
          <FilterButton
            label='3 years'
            onClick={() => setFilter('3years')}
            isActive={filter === '3years'}
          />
          <FilterButton
            label={TransactionStatus.APPROVED}
            onClick={() => setFilter(TransactionStatus.APPROVED)}
            isActive={filter === TransactionStatus.APPROVED}
          />
          <FilterButton
            label={TransactionStatus.PENDING}
            onClick={() => setFilter(TransactionStatus.PENDING)}
            isActive={filter === TransactionStatus.PENDING}
          />
          <FilterButton
            label='History'
            isActive={filter === 'history'}
            onClick={() => setFilter('history')}
          />
        </div>
      </div>
      <div className='flex items-center mt-2 sm:mt-0'>
        <span className='mr-2 text-beam-500 text-xs'>Filter by</span>
        <div className='relative'>
          <button
            onClick={() => setSelectedType(TransactionType.SPOT)}
            className='py-2 tracking-[0.5px] px-4 text-beam-500 text-xs rounded-md border border-gray-300 flex items-center hover:bg-gray-50'
          >
            {TransactionType.SPOT}
            <ChevronDown className='w-4 h-4 ml-2 text-gray-darker' />
          </button>
        </div>
      </div>
    </div>
  );
};
