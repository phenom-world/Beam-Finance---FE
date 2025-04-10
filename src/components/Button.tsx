import { ButtonHTMLAttributes, forwardRef } from 'react';

import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex justify-center items-center rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary:
        'border border-transparent text-black bg-primary hover:bg-primary focus:ring-primary',
      secondary:
        'border border-transparent text-white bg-gray-800 hover:bg-gray-700 focus:ring-neutral',
      outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const width = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Spinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
