import React from 'react';

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-6 rounded-md text-xs border ${
      !isActive
        ? 'border-beam-300  text-beam-500 font-medium border-[0.5px]'
        : 'border-gray-darker text-gray-darker'
    }`}
  >
    {label}
  </button>
);
