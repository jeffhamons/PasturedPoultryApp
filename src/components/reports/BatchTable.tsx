import React from 'react';

interface TableData {
  date: string;
  weight?: number;
  feed?: number;
  mortality?: number;
  notes?: string;
}

interface BatchTableProps {
  data: TableData[];
}

export function BatchTable({ data }: BatchTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mortality</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.weight?.toFixed(2) || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.feed || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.mortality || '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {row.notes || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}