interface ArrowRightIconProps {
  className?: string;
}

const ArrowRightIcon = ({ className = '' }: ArrowRightIconProps) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
    </svg>
  );
};

export default ArrowRightIcon;
