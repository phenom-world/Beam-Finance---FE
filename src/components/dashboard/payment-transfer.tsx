import { useState, useTransition } from 'react';

import { useTransfer } from '../../hooks/api/wallet';
import { capitalizeFirst } from '../../util/helper';
import Button from '../Button';
import Input from '../Input';

interface TransferFormData {
  email: string;
  amount: string;
  note: string;
}

const initialFormData: TransferFormData = {
  email: '',
  amount: '',
  note: '',
};

interface PaymentTransferProps {
  action: 'transfer' | 'withdraw';
  onClose: () => void;
}

const PaymentTransfer = ({ action, onClose }: PaymentTransferProps) => {
  const [formData, setFormData] = useState<TransferFormData>(initialFormData);
  const [isLoading, startTransition] = useTransition();

  const { handleTransfer } = useTransfer({
    onSuccess: onClose,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      handleTransfer({
        recipientEmail: formData.email,
        amount: Number(formData.amount),
        note: formData.note,
        mode: action,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 pt-3'>
      {action !== 'withdraw' && (
        <Input
          id='email'
          label='Email'
          placeholder='Enter email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          labelClassName='font-semibold'
          required
          type='email'
        />
      )}
      <Input
        id='amount'
        label='Amount'
        placeholder='Enter amount'
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        labelClassName='font-semibold'
        required
        type='number'
      />

      <Input
        id='note'
        label='Note'
        placeholder='Enter note'
        value={formData.note}
        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        labelClassName='font-semibold'
        type='text'
      />

      <div className='pt-[67px]'>
        <Button
          isLoading={isLoading}
          className='w-full rounded-md bg-[#F9D900] px-4 py-2 sm:py-4 text-center font-semibold text-black transition hover:bg-[#F9D900]/90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-0'
        >
          {capitalizeFirst(action)}
        </Button>
      </div>
    </form>
  );
};

export default PaymentTransfer;
