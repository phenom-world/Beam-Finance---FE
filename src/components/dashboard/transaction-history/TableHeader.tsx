import React from 'react';

interface TableHeaderProps {
  headers: string[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => (
  <thead>
    <tr className='border-b border-gray-200'>
      {headers.map((header) => (
        <th
          key={header}
          scope='col'
          className='text-left text-xs py-[6px] px-[7px] font-medium text-[#0D0D0C]'
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);
