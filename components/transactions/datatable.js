import React from 'react';
import Image from "next/image";

export default function TransactionsTable({transactions}) {
  return (
    <table className="w-full table-auto border-separate ">
      <thead className='sticky top-0 z-10 border border-gray-300 dark:border-transparent'>
      <tr
        className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-center">#</th>
        <th className="py-3 px-6 text-left">Investor</th>
        <th className="py-3 px-6 text-left">Description</th>
        <th className="py-3 px-6 text-center">Money In</th>
        <th className="py-3 px-6 text-center">Money Out</th>
        <th className="py-3 px-6 text-center">Date</th>
        <th className="py-3 px-6 text-center">Actions</th>
      </tr>
      </thead>
      <tbody className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-light">
      {transactions.length > 0 && transactions.map((item, index) => {
        return (
          <tr
            key={item.id}
            className={`border border-gray-300 dark:border-gray-500 ${index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-transparent'} hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer`}>

            <td className='py-3 px-3 font-medium text-center'>{index + 1}</td>

            <td className="py-3 px-6 text-center">
              <div className="flex items-center justify-center">
                <Image
                  alt=''
                  width='24'
                  height='24'
                  loader={() => item.investor.photo}
                  className="rounded-full border-gray-200 dark:border-gray-500 border transform hover:scale-125"
                  src={item.investor.photo}/>

                <span className='font-medium ml-4'>{item.investor.name}</span>
              </div>
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
            <td className="py-3 px-6 text-center">
              <div className="flex item-center justify-center">
                <div
                  // onClick={() => deleteInvestor(item)}
                  className="w-4 mr-5 transform hover:text-purple-500 hover:scale-110">
                  <i className='bx bx-trash text-lg'/>
                </div>

                <div
                  // onClick={() => deleteInvestor(item)}
                  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                  <i className='bx bx-printer text-lg'/>
                </div>
              </div>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  );
};
