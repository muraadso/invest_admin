import React from 'react';
import Image from "next/image";

export default function TransactionsTable({transactions}) {
  return (
    <table className="w-full table-auto border-separate ">
      <thead className='sticky top-0 z-10 border border-gray-300 dark:border-transparent'>
      <tr
        className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
        <th className="py-3 px-4 text-center">#</th>
        <th className="py-3 px-6 text-left">Investor</th>
        <th className="py-3 px-6 text-left">Description</th>
        <th className="py-3 px-6 text-center">Money In</th>
        <th className="py-3 px-6 text-center">Money Out</th>
        <th className="py-3 px-6 text-center">Date</th>
      </tr>
      </thead>
      <tbody className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-light">
      {transactions.length > 0 && transactions.map((item, index) => {
        return (
          <tr
            key={item.id}
            className={`border border-gray-300 dark:border-gray-500 ${index % 2 !== 0 ? 'bg-white dark:bg-transparent' : 'bg-transparent'} hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer`}>

            <td className='py-3 px-4 font-medium text-center'>{index + 1}</td>

            <td className="py-3 px-6">
              <a href={`/investors/profile?q=${item.investor.id}`} className='font-medium text-blue-500 underline'>{item.investor.name}</a>
            </td>
            <td className="py-3 px-6 text-left">
              <span className='font-medium'>{item.description}</span>
            </td>
            <td className="py-3 px-6 text-center">
              <span className='font-medium'>{item.moneyIn ?? '-'}</span>
            </td>
            <td className="py-3 px-6 text-center">
              <span className='font-medium'>{item.moneyOut ?? '-'}</span>
            </td>
            <td className="py-3 px-6 text-center">
              <span className='font-medium'>{item.date}</span>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  );
};
