export const TransactionTableSkeleton = () => {
  return (
    <div className='w-full'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className='animate-pulse'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-32'></div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-24'></div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-20'></div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-16'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
