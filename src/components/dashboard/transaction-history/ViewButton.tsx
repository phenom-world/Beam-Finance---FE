import React from 'react';

interface ViewButtonProps {
  onClick: () => void;
}

export const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className='border text-beam-800 border-beam-300 text-xs px-4 py-1 rounded hover:bg-gray-100 transition-colors'
  >
    View
  </button>
);
