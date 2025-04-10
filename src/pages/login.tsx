import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import { useLogin } from '../hooks/api/auth';
import { LoginFormData, loginSchema } from '../schemas/auth';

export default function LoginPage() {
  const { handleLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      handleLogin(data);
    });
  };

  return (
    <AuthLayout>
      <div className='mx-auto'>
        <h2 className='text-2xl md:text-4xl font-bold text-gray-900'>Sign in to Beam</h2>
        <p className='mt-2 md:mt-4 text-xs md:text-sm text-gray-600'>
          Please sign in with the your assigned login details{' '}
        </p>

        <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4 lg:space-y-9 '>
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
          <p className='ml-2 mt-3 mb-8 md:ml-3 block text-xs md:text-sm text-neutral text-right'>
            <a href='#' className='underline hover:text-secondary'>
              Forgot password?
            </a>
          </p>
          <Button
            className='!bg-gray-dark hover:!bg-gray-dark/90 !rounded-full text-white font-bold !py-3'
            type='submit'
            fullWidth
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
