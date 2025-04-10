import { forwardRef, InputHTMLAttributes, useState } from 'react';

import EyeClosedIcon from '../assets/svgs/eyeclosed';
import EyeOpenedIcon from '../assets/svgs/eyeopen';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className = '', showPasswordToggle = false, type, labelClassName, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm sm:text-base font-normal text-gray-light ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
            className={`mt-1 block w-full px-3 sm:px-[18px] py-2 sm:py-3 border ${
              error ? 'border-red-300' : 'border-gray-light border-[0.5px]'
            } rounded-lg sm:rounded-xl shadow-sm placeholder-gray-400 focus:border-[2px] focus:outline-none focus:ring-gray-dark focus:border-gray-dark text-sm sm:text-base ${className}`}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
            >
              {showPassword ? <EyeOpenedIcon /> : <EyeClosedIcon />}
            </button>
          )}
        </div>
        {error && (
          <p className='mt-1 text-sm text-red-600' id={`${props.id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
