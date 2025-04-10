import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

import { ObjectData } from '../types';
import axiosInstance from './setupAxios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text = '') =>
  text.trim().charAt(0).toUpperCase() + text.trim().slice(1).toLowerCase();

export const capitalizeFirst = (text = '') =>
  text.trim().charAt(0).toUpperCase() + text.trim().slice(1);

export const handleErrorResponse = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(
      error.response?.data?.message ?? error.message ?? 'An error occurred. Please try again.'
    );
  } else if (error instanceof Error) {
    toast.error(error.message ?? 'An error occurred. Please try again.');
  } else {
    toast.error('An error occurred. Please try again.');
  }
  throw error;
};

export function addThousandSeparator(value: number | string, fractionalDigits = 2) {
  return Number(Number(value).toFixed(fractionalDigits)).toLocaleString('en', {
    minimumFractionDigits: fractionalDigits,
    maximumFractionDigits: fractionalDigits,
  });
}

export function getBalance(value: string) {
  return {
    integer: value.split('.')[0],
    decimal: value.split('.')[1],
  };
}

export const exclude = <T extends ObjectData, Key extends keyof T>(
  obj: T,
  keys: Key[]
): Omit<T, Key> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<T, Key>;
};

export const sanitize = <T extends ObjectData>(obj?: T): Partial<T> => {
  if (!obj) return {};
  const pickedObj: Partial<T> = {};
  Object.keys(obj).forEach((key: keyof T) => {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      pickedObj[key] = obj[key];
    }
  });
  return pickedObj;
};

export const getQueryString = (data: ObjectData) => {
  const newValues = sanitize(data);
  return new URLSearchParams(newValues).toString();
};

export const fetcher = async <T>(...args: [RequestInfo, RequestInit]): Promise<T | void> => {
  try {
    const res = await axiosInstance.get(args[0] as string);
    const data: T = res.data;

    return data;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};
