import TransactionIcon from '../../../assets/svgs/transaction';

export const EmptyTransactionState = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4'>
        <TransactionIcon />
      </div>
      <h3 className='text-lg font-medium text-gray-900 mb-2'>No transactions yet</h3>
      <p className='text-sm text-gray-500 text-center'>
        Your transaction history will appear here when you make a transaction
      </p>
    </div>
  );
};
