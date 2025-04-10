import { BalanceCard } from '../components/dashboard/balance-card';
import { TransactionHistory } from '../components/dashboard/transaction-history';

export default function Dashboard() {
  return (
    <div className='flex flex-col h-full px-4 md:px-0'>
      <h1 className='text-2xl font-bold mb-6 md:mb-10 border-b-[0.5px] border-border pb-4'>
        Wallet
      </h1>
      <div className='flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 border-b pb-6'>
        <BalanceCard />
        <div
          aria-label='divider'
          className='w-full h-full md:h-[calc(100vh-250px)] md:w-[1px] bg-border border-[0.5px] my-4 md:my-0'
        />
        <TransactionHistory />
      </div>
    </div>
  );
}
