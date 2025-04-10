import toast from 'react-hot-toast';
import { mutate } from 'swr';

import { Transaction } from '../../types';
import { exclude, getQueryString, handleErrorResponse } from '../../util/helper';
import axiosInstance from '../../util/setupAxios';
import useQuery from '../useQuery';

interface FundWalletData {
  amount: number;
  paymentMethod: 'CARD' | 'TRANSFER' | 'WITHDRAWAL';
}

interface TransferData {
  recipientEmail: string;
  amount: number;
  note?: string;
  mode: 'transfer' | 'withdraw';
}

interface TransactionFilters {
  page?: number;
  limit?: number;
}

type MutationProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useGetTransactions = (props?: TransactionFilters) => {
  const query = getQueryString({ ...props });
  return useQuery<{
    items: Transaction[];
    meta: {
      totalPages: number;
    };
  }>(`/transactions?${query}`);
};

export const useGetUserWallet = () => {
  return useQuery<{
    balance: number;
    accountNumber: string;
  }>('/wallet');
};

export const useFundWallet = (props?: MutationProps) => {
  const handleFundWallet = async (data: FundWalletData) => {
    try {
      const response = await axiosInstance.post('/wallet/fund', { ...data, currency: 'NGN' });

      mutate((key) => typeof key === 'string' && key.startsWith('/transactions'));
      mutate((key) => typeof key === 'string' && key.startsWith('/wallet'));

      toast.success(response?.data?.message);
      props?.onSuccess?.();
      return response.data;
    } catch (error) {
      handleErrorResponse(error);
      props?.onError?.();
    }
  };

  return { handleFundWallet };
};

export const useTransfer = (props?: MutationProps) => {
  const handleTransfer = async (data: TransferData) => {
    let payload = { ...exclude(data, ['mode']) } as Partial<TransferData>;

    try {
      if (data.mode === 'withdraw') {
        payload = exclude(payload, ['recipientEmail']);
      }
      const response = await axiosInstance.post(`/wallet/${data.mode}`, {
        ...payload,
        currency: 'NGN',
      });
      toast.success(response?.data?.message);
      mutate((key) => typeof key === 'string' && key.startsWith('/transactions'));
      mutate((key) => typeof key === 'string' && key.startsWith('/wallet'));
      props?.onSuccess?.();
      return response.data;
    } catch (error) {
      handleErrorResponse(error);
      props?.onError?.();
    }
  };

  return { handleTransfer };
};
