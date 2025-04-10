import { useTransition } from 'react';

import AddIcon from '../../assets/svgs/add';
import BankTransferIcon from '../../assets/svgs/bank-transfer';
import DebitCardIcon from '../../assets/svgs/debit-card';
import { useFundWallet } from '../../hooks/api/wallet';
import { PaymentMethod } from '../../types';
import Button from '../Button';

interface PaymentOptionsProps {
  callback: () => void;
  selectedMethod?: string;
  setSelectedMethod: (method: string) => void;
  amount: number;
  onClose: () => void;
}

export function PaymentOptions({
  callback,
  selectedMethod,
  setSelectedMethod,
  amount,
  onClose,
}: PaymentOptionsProps) {
  const [isLoading, startTransition] = useTransition();
  const paymentMethods = [
    { id: 'transfer', name: 'Bank Transfer', icon: <BankTransferIcon /> },
    { id: 'card', name: 'Add Debit/Credit Card', icon: <DebitCardIcon /> },
  ];

  const { handleFundWallet } = useFundWallet({
    onSuccess: onClose,
  });

  const handleProceed = () => {
    if (selectedMethod === 'transfer') {
      startTransition(() => {
        handleFundWallet({
          amount: Number(amount),
          paymentMethod: PaymentMethod.TRANSFER,
        });
      });
    } else {
      callback();
    }
  };
  return (
    <>
      <div className='space-y-3'>
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethod(method.id);
              }}
              className={`flex w-full items-center justify-between space-x-4 rounded-lg border p-4 text-left transition-colors hover:bg-gray-50 ${
                isSelected ? 'border-[#5E5204] border-2' : 'border-[#D8DAE5]'
              }`}
            >
              <div
                className={`flex items-center space-x-3  ${
                  isSelected ? 'text-[#101840]' : 'text-[#474D66]'
                }`}
              >
                {Icon}
                <span className={'font-medium'}>{method.name}</span>
              </div>

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  isSelected ? 'border-[#5E5204] border-2' : 'border-[#D8DAE5]'
                }`}
              >
                {isSelected && <div className='h-2.5 w-2.5 rounded-full bg-[#5E5204]'></div>}
              </div>
            </button>
          );
        })}

        <button className='flex w-full items-center space-x-3 rounded-lg  p-4 text-left text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800'>
          <AddIcon />
          <span className='font-medium'>Add Payment Method</span>
        </button>
      </div>
      <div className='mt-[67px]'>
        <Button
          onClick={handleProceed}
          isLoading={isLoading}
          disabled={!selectedMethod}
          className='w-full rounded-md bg-[#F9D900] px-4 py-2 sm:py-4 text-center font-semibold text-black transition hover:bg-[#F9D900]/90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-0'
        >
          Proceed
        </Button>
      </div>
    </>
  );
}
