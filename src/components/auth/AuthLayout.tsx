import { ReactNode } from 'react';

import bgImage from '../../assets/images/bg.png';
import CollateralizedIcon from '../../assets/svgs/collateralized';
import LicensedIcon from '../../assets/svgs/licensed';
import SecuredIcon from '../../assets/svgs/secured';
import FeatureItem from './FeatureItem';
import Logo from './Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='min-h-screen flex'>
      <div className='flex px-8 lg:px-0 flex-col justify-start mt-[158px] bg-white order-1 flex-1'>
        <div className='lg:mx-36 mx-auto w-full max-w-md'>{children}</div>
      </div>

      <div
        className='hidden lg:flex relative w-[30%] bg-[#0C110D] px-[78px] py-[72px] flex-col items-start justify-end'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative mt-auto'>
          <Logo className='w-fit' />
          <h1 className='text-3xl font-semibold text-white leading-[42px] mt-6 mb-12'>
            Unlock High Returns with Collateralized Equity Asset
          </h1>
          <div className='space-y-4'>
            <FeatureItem icon={<CollateralizedIcon />} text='Collateralized' />
            <FeatureItem icon={<SecuredIcon />} text='Secured' />
            <FeatureItem icon={<LicensedIcon />} text='Licensed & regulated' />
          </div>
        </div>
      </div>
    </div>
  );
}
