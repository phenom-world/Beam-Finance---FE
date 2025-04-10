import { useState } from 'react';

import CardIcon from '../../assets/svgs/card';
import CopyIcon from '../../assets/svgs/copy';
import PendingIcon from '../../assets/svgs/pending';
import WemaIcon from '../../assets/svgs/wema';
import { useGetUserWallet } from '../../hooks/api/wallet';
import { addThousandSeparator, getBalance } from '../../util/helper';
import { PaymentModal } from './payment';

export const BalanceCard = () => {
  const [action, setAction] = useState<'fund' | 'withdraw' | 'transfer'>();
  const { data } = useGetUserWallet();

  return (
    <div className='w-full md:w-[369px] rounded-sm'>
      <div className=' bg-card'>
        <div className='px-5 pt-6'>
          <div className='flex items-center justify-between pb-3 border-b-[0.5px] border-[#C8D9D1]'>
            <h2 className='text-xs font-semibold text-beam-700'>Actual Balance</h2>
            <CardIcon />
          </div>
          <p className='text-xl font-bold text-gray-900 mt-[27px] pb-[27px] border-b-[0.5px] border-[#C8D9D1]'>
            ₦{getBalance(addThousandSeparator(data?.data.balance ?? 0)).integer}
            <span className='text-sm text-beam-700'>
              {'.'}
              {getBalance(addThousandSeparator(data?.data.balance ?? 0)).decimal}
            </span>
          </p>
        </div>
        <div className='flex items-center gap-2 py-[21px] border-b border-[#C8D9D1] border-dashed'>
          <div className='flex items-center gap-2 px-5'>
            <WemaIcon />
            <p className='text-xs'>Wema Bank 010 210 2020</p>
            <CopyIcon />
          </div>
        </div>
        <div className='px-5 mt-6'>
          <div className='space-y-2 pb-12'>
            <div className='flex justify-between items-center gap-2 border-b border-[#C8D9D1] pb-[11px]'>
              <p className='text-xs text-gray-600'>Pending Amount</p>
              <PendingIcon />
            </div>
            <p className='text-xl font-bold text-gray-900 pt-[16px]'>
              ₦0<span className='text-sm text-beam-700'>{'.'}00</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-3 text-[11px] mt-[18px]'>
        <button
          onClick={() => setAction('fund')}
          className='w-1/2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-[5px] transition-colors duration-200 font-medium shadow-2xl'
        >
          Add Funds
        </button>
        <button
          onClick={() => setAction('withdraw')}
          className='w-1/2 border border-beam-300 text-gray-700 px-4 py-2 rounded-[5px] transition-colors duration-200 font-medium'
        >
          Withdrawal
        </button>
      </div>
      <div className='flex gap-3 text-[11px] mt-3'>
        <button
          onClick={() => setAction('transfer')}
          className='w-1/3 border border-beam-300 text-gray-700 px-4 py-2 rounded-[5px] transition-colors duration-200 font-medium'
        >
          Transfer
        </button>
        <button className='w-1/3 border border-beam-300 text-gray-700 px-4 py-2 rounded-[5px] transition-colors duration-200 font-medium'>
          Place Lien
        </button>
        <button className='w-1/3 border border-beam-300 text-gray-700 px-4 py-2 rounded-[5px] transition-colors duration-200 font-medium'>
          Freeze Wallet
        </button>
      </div>

      <PaymentModal isOpen={!!action} onClose={() => setAction(undefined)} action={action} />
    </div>
  );
};
