interface ArrowLeftIconProps {
  className?: string;
}

const ArrowLeftIcon = ({ className = '' }: ArrowLeftIconProps) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
    </svg>
  );
};

export default ArrowLeftIcon;
