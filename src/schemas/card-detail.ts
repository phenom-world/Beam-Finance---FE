import { z } from 'zod';

const currentYear = new Date().getFullYear();
const currentYearLastTwoDigits = currentYear % 100;

export const cardDetailSchema = z.object({
  cardDetails: z
    .string()
    .regex(/^\d{16}$/, 'Invalid Card Number')
    .min(16, 'Card number must be 16 digits')
    .max(16, 'Card number must be 16 digits'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry format (MM/YY)')
    .refine(
      (val) => {
        const [month, year] = val.split('/');
        const expiryYear = parseInt(year);
        const expiryMonth = parseInt(month);
        const currentMonth = new Date().getMonth() + 1;

        if (expiryYear > currentYearLastTwoDigits + 3) return false;
        if (expiryYear === currentYearLastTwoDigits && expiryMonth < currentMonth) return false;
        return true;
      },
      { message: 'Card has expired or expiry date is too far in the future' }
    ),
  cvv: z
    .string()
    .regex(/^\d{3}$/, 'Invalid CVV')
    .min(3, 'CVV must be 3 digits')
    .max(3, 'CVV must be 3 digits'),
});

export type CardDetail = z.infer<typeof cardDetailSchema>;
