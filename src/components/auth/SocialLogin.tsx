import AppleIcon from '../../assets/svgs/apple';
import GoogleIcon from '../../assets/svgs/google';
import Button from '../Button';

export default function SocialLogin() {
  return (
    <div className='mt-4 sm:mt-6'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-gray-50 text-neutral text-xs sm:text-sm'>OR SIGNIN WITH</span>
        </div>
      </div>

      <div className='flex w-fit mx-auto items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4'>
        <Button
          type='button'
          variant='outline'
          fullWidth
          className='flex items-center justify-center gap-2 !px-6 sm:!px-12 py-2 sm:py-3 !rounded-[30px] w-fit'
        >
          <div className='w-4 h-4 sm:w-5 sm:h-5'>
            <GoogleIcon className='h-4 w-4 sm:h-5 sm:w-5' />
          </div>
          <span className='sr-only'>Continue with Google</span>
        </Button>

        <Button
          type='button'
          variant='outline'
          fullWidth
          className='flex items-center justify-center gap-2 !px-6 sm:!px-12 py-2 sm:py-3 !rounded-[30px] w-fit'
        >
          <div className='w-4 h-4 sm:w-5 sm:h-5'>
            <AppleIcon className='h-4 w-4 sm:h-5 sm:w-5' />
          </div>
          <span className='sr-only'>Continue with Apple</span>
        </Button>
      </div>
    </div>
  );
}
