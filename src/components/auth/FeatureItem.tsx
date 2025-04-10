import { ReactNode } from 'react';

interface FeatureItemProps {
  icon: ReactNode;
  text: string;
}

const FeatureItem = ({ icon, text }: FeatureItemProps) => (
  <div className='flex items-center text-gray-300 gap-x-3'>
    {icon}
    <span className='text-sm'>{text}</span>
  </div>
);
export default FeatureItem;
