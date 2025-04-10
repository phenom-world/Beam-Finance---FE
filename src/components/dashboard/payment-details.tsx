import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFundWallet } from '../../hooks/api/wallet';
import { cardDetailSchema } from '../../schemas/card-detail';
import { PaymentMethod } from '../../types';
import Button from '../Button';
import Input from '../Input';

type CardDetailFormData = z.infer<typeof cardDetailSchema>;

const PaymentDetails = ({ amount, onClose }: { amount: number; onClose: () => void }) => {
  const [isLoading, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CardDetailFormData>({
    resolver: zodResolver(cardDetailSchema),
  });

  const { handleFundWallet } = useFundWallet({
    onSuccess: onClose,
  });

  const onSubmit = (data: CardDetailFormData) => {
    startTransition(() => {
      handleFundWallet({ amount, paymentMethod: PaymentMethod.CARD });
    });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Allow backspace to delete the slash
    if (value.length === 3 && value[2] === '/') {
      value = value.slice(0, 2);
    } else {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    setValue('expiry', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 pt-3'>
      <Input
        id='cardDetails'
        label='Card Details'
        placeholder='1234 5678 9012 3456'
        error={errors.cardDetails?.message}
        {...register('cardDetails')}
        labelClassName='font-semibold'
        maxLength={16}
      />
      <Input
        id='expiry'
        label='Expiry Date'
        placeholder='MM/YY'
        error={errors.expiry?.message}
        {...register('expiry', {
          onChange: handleExpiryChange,
        })}
        labelClassName='font-semibold'
        maxLength={5}
      />
      <Input
        id='cvv'
        label='CVV'
        placeholder='123'
        error={errors.cvv?.message}
        {...register('cvv')}
        labelClassName='font-semibold'
        maxLength={3}
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
