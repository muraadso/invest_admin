import React, {Fragment, useState} from 'react';

import {Dialog, Transition} from '@headlessui/react'
import {FormOutlined} from "@ant-design/icons";

export default function Statement({transactions}) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={() => {
          openModal()

        }}
        className='flex items-center shadow h-8 ml-2 px-2 ml-4 rounded bg-red-500 hover:bg-red-600 text-white flex'>
        <FormOutlined className='bx bx-dollar-circle mr-2'/>
        <p>Print Statement</p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >

                <Dialog.Panel
                  className="statement-wrapper w-fit transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left align-middle shadow-xl transition-all">

                  <div
                    id='statement'
                    className='w-full h-[calc(100vh-5rem)] overflow-y-auto'>
                    <div className='w-full mx-auto flex flex-col px-16 pt-48 statement bg-white' style={{width: '210mm', height: '297mm'}}>
                      <div className='flex justify-between items-start '>
                        <div className="flex items-center">
                          <img className='w-20' src="/brand.png" alt=""/>
                          <img className='ml-4' src="/brand_text.png" alt=""/>
                        </div>
                        <div className='flex flex-col'>
                          <p className='text-end'>
                            Botan Building, Road #1,<br/>
                            Hargeisa Somaliland<br/>
                            Invest@muraadso.com<br/>
                            252-63-3335995<br/>
                          </p>
                          <p className='mt-8 text-lg font-semibold'>INVESTMENT STATEMENT</p>
                        </div>
                      </div>

                      <p className='text-sm font-medium'>Statement Date: <span className='ml-5'>{new Date().toISOString().substring(0,10)}</span></p>
                      <p className='mt-1 text-sm font-medium'>Period Covered: <span className='ml-5'>{transactions && transactions.length > 0 && transactions[0].date} - {transactions && transactions.length > 0 && transactions[transactions.length - 1].date}</span></p>

                      <div className='flex justify-between mt-8'>
                        <div className='flex flex-col'>
                          <p className='font-semibold'>{transactions && transactions.length > 0 && transactions[0].investor?.name}</p>
                          <p className='mt-0.5'>{transactions && transactions.length > 0 && transactions[0].investor?.phoneNumber}</p>
                          <p className='mt-0.5'>{transactions && transactions.length > 0 && transactions[0].investor?.address + ', ' + transactions[0].investor?.city}</p>
                        </div>

                        <div className='flex flex-col'>
                          <p className='mt-0 text-end'>Total Money In: <span className='ml-4'>${transactions && transactions.map(it => it.moneyIn).reduce((partialSum, a) => partialSum + a, 0)}</span></p>
                          <p className='mt-0.5 text-end'>Total Money Out: <span className='ml-4'>${transactions && transactions.map(it => it.moneyOut).reduce((partialSum, a) => partialSum + a, 0)}</span></p>
                          <p className='mt-0.5 text-end'>Closing Balance: <span className='ml-4'>${transactions && transactions.map(it => it.moneyIn - it.moneyOut).reduce((partialSum, a) => partialSum + a, 0)}</span></p>
                        </div>
                      </div>

                      <p className='mt-12 text-lg font-semibold'>Transactions</p>
                      <table className="w-full table-auto border-separate border-t-2 border-gray-400">
                        <thead className='border border-gray-300 dark:border-transparent'>
                        <tr
                          className="text-gray-600 dark:text-gray-500 text-sm leading-normal">
                          <th className="py-2 px-6 text-center">Date</th>
                          <th className="py-2 px-6 text-left">Description</th>
                          <th className="py-2 px-6 text-center">Money In</th>
                          <th className="py-2 px-6 text-center">Money Out</th>
                          <th className="py-2 pl-6 text-center">Balance</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                        {transactions.length > 0 && transactions.map((item, index) => {
                          return (
                            <tr
                              key={item.id}
                              className={`border border-gray-300 dark:border-gray-500 ${index % 2 !== 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-100'} cursor-pointer`}>

                              <td className="py-3 px-6 font-medium text-left">
                                <p>{item.date}</p>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <span className='font-medium'>{item.description}</span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span className='font-medium'>${item.moneyIn ?? '-'}</span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span className='font-medium'>${item.moneyOut ?? '-'}</span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span className='font-medium'>${item.moneyIn - item.moneyOut  ?? '-'}</span>
                              </td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 mb-8 mr-8">

                    <button
                      type="button"
                      className="mr-4 px-4 py-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 rounded-md border border-gray-400 hover:border-red-500"
                      onClick={() => {
                        closeModal()
                      }}
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      className="px-8 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md border-2 border-transparent hover:bg-red-600"
                      onClick={async  () => {
                        document.body.innerHTML = document.getElementById('statement').innerHTML;
                        await window.print();
                        window.location.reload()
                      }}
                    >
                      Print
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
