import { useState } from 'react';

import { useGetTransactions } from '../../../hooks/api/wallet';
import { Pagination } from '../../Pagination';
import { EmptyTransactionState } from './EmptyTransactionState';
import { TransactionFilters } from './TransactionFilters';
import { TransactionTable } from './TransactionTable';
import { TransactionTableSkeleton } from './TransactionTableSkeleton';

export const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetTransactions({ page: currentPage, limit: 10 });
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const hasTransactions = data?.data.items && data.data.items.length > 0;

  return (
    <div className='mb-6 flex-1 w-full'>
      <h2 className='text-base font-semibold mb-5'>Transaction History</h2>
      <TransactionFilters />
      {isLoading ? (
        <TransactionTableSkeleton />
      ) : hasTransactions ? (
        <>
          <TransactionTable transactions={data?.data.items ?? []} />
          <div className='mt-6'>
            <Pagination
              currentPage={currentPage}
              totalPages={data?.data.meta.totalPages ?? 0}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <EmptyTransactionState />
      )}
    </div>
  );
};
