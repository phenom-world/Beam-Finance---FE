import React from 'react';

import { TransactionStatus } from '../../../types';
import { capitalizeFirst } from '../../../util/helper';

interface StatusIndicatorProps {
  status: TransactionStatus;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED:
        return 'bg-green-500';
      case TransactionStatus.PENDING:
        return 'bg-yellow-500';
      case TransactionStatus.FAILED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='flex items-center'>
      <div className={`w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></div>
      <span>{capitalizeFirst(status.toLowerCase())}</span>
    </div>
  );
};
