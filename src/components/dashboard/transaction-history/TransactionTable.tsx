import React from 'react';

import { Transaction } from '../../../types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface TransactionTableProps {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const headers = [
    'Transaction ID',
    'Transaction Type',
    'Payment Method',
    'Amount (₦)',
    'Status',
    'Date',
    'Action',
  ];

  return (
    <div className='border-t border-y-beam-300 overflow-hidden h-[calc(100vh-450px)] overflow-y-auto'>
      <div className='overflow-x-auto no-scrollbar'>
        <table className='w-full min-w-[800px]' role='table' aria-label='Transaction history'>
          <TableHeader headers={headers} />
          <tbody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
