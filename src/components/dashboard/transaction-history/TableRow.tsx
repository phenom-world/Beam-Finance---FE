import React from 'react';

import { Transaction } from '../../../types';
import { addThousandSeparator, formatDate } from '../../../util/helper';
import { StatusIndicator } from './StatusIndicator';
import { ViewButton } from './ViewButton';

interface TableRowProps {
  transaction: Transaction;
}

export const TableRow: React.FC<TableRowProps> = ({ transaction }) => (
  <tr className='border-b border-beam-300 hover:bg-gray-50 text-beam-800' role='row'>
    <td className='py-5 text-xs'>{transaction.reference}</td>
    <td className='py-5 px-[7px] text-xs'>{transaction.type}</td>
    <td className='py-5 px-[7px] text-xs'>{transaction.paymentMethod}</td>
    <td className='py-5 px-[7px] text-xs'>₦{addThousandSeparator(transaction.amount)}</td>
    <td className='py-5 px-[7px] text-xs'>
      <StatusIndicator status={transaction.status} />
    </td>
    <td className='py-5 px-[7px] text-xs'>{formatDate(transaction.createdAt)}</td>
    <td className='py-5 px-[7px] text-xs'>
      <ViewButton onClick={() => {}} />
    </td>
  </tr>
);
