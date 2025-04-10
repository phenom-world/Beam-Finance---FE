import { useState, useTransition } from 'react';

import { useFundWallet } from '../../hooks/api/wallet';
import { PaymentMethod } from '../../types';
import Button from '../Button';
import Input from '../Input';

interface PaymentFormData {
  cardDetails: string;
  expiryDate: string;
  cvv: string;
}

const PaymentDetails = ({ amount, onClose }: { amount: number; onClose: () => void }) => {
  const [isLoading, startTransition] = useTransition();

  const { handleFundWallet } = useFundWallet({
    onSuccess: onClose,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      handleFundWallet({ amount, paymentMethod: PaymentMethod.CARD });
    });
  };
  const [formData, setFormData] = useState<PaymentFormData>({
    cardDetails: '',
    expiryDate: '',
    cvv: '',
  });

  return (
    <form onSubmit={onSubmit} className='space-y-4 pt-3'>
      <Input
        id='cardDetails'
        label='Card Details'
        placeholder='1234 5678 9012 3456'
        value={formData.cardDetails}
        onChange={(e) => setFormData({ ...formData, cardDetails: e.target.value })}
        labelClassName='font-semibold'
        required
      />
      <Input
        id='expiryDate'
        label='Expiry Date'
        placeholder='MM/YY'
        value={formData.expiryDate}
        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
        labelClassName='font-semibold'
        required
      />
      <Input
        id='cvv'
        label='CVV'
        placeholder='123'
        value={formData.cvv}
        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
        labelClassName='font-semibold'
        required
      />
      <div className='pt-[67px]'>
        <Button
          isLoading={isLoading}
          disabled={!amount}
          className='w-full rounded-md bg-[#F9D900] px-4 py-2 sm:py-4 text-center font-semibold text-black transition hover:bg-[#F9D900]/90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-0'
        >
          Pay now
        </Button>
      </div>
    </form>
  );
};

export default PaymentDetails;
