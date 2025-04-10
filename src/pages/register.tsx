import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/auth/AuthLayout';
import SocialLogin from '../components/auth/SocialLogin';
import Button from '../components/Button';
import Input from '../components/Input';
import { useRegister } from '../hooks/api/auth';
import { RegisterFormData, registerSchema } from '../schemas/auth';

export default function RegisterForm() {
  const { handleRegister } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      tocAgreed: false,
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: RegisterFormData) => {
    startTransition(() => {
      handleRegister({
        ...data,
        tocAgreed: true,
      });
    });
  };

  return (
    <AuthLayout>
      <div className='mx-auto'>
        <h2 className='text-2xl md:text-4xl font-bold text-gray-900'>Create an account</h2>
        <p className='mt-2 md:mt-4 text-xs md:text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-neutral underline hover:text-secondary'>
            Login
          </Link>
        </p>

        <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              id='fullName'
              type='text'
              label='Full name'
              error={errors.fullName?.message}
              {...register('fullName')}
              placeholder='Enter your full name'
            />
            <Input
              id='email'
              type='email'
              label='Email Address'
              error={errors.email?.message}
              {...register('email')}
              placeholder='Enter your email address'
            />
            <Input
              id='password'
              type='password'
              label='Password'
              error={errors.password?.message}
              showPasswordToggle
              {...register('password')}
              placeholder='Enter your password'
            />
          </div>
          <div className='flex items-center pt-3 pb-8'>
            <input
              id='tocAgreed'
              data-testid='tocAgreed'
              type='checkbox'
              className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-lg'
              required={isValid && getValues('tocAgreed') !== undefined}
            />
            <label
              htmlFor='tocAgreed'
              className='ml-2 md:ml-3 block text-xs md:text-sm text-neutral'
            >
              I agree to BeamMarkets{' '}
              <a href='#' className='underline hover:text-secondary'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='#' className='underline hover:text-secondary'>
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.tocAgreed && <p className='text-sm text-red-600'>{errors.tocAgreed.message}</p>}

          <Button
            className='!bg-gray-dark hover:!bg-gray-dark/90 !rounded-full text-white font-bold !py-3'
            type='submit'
            data-testid='register-button'
            fullWidth
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
      </div>
      <SocialLogin />
    </AuthLayout>
  );
}
