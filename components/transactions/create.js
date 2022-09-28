import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {collection, getDocs, getFirestore, query, addDoc} from "firebase/firestore";
import Loading from "../loading";

export default function CreateTransaction() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const initial = {
    investor: '',
    description: '',
    moneyIn: 0,
    moneyOut: 0,
    date: new Date().toISOString().substring(0,10),
  }

  const [portfolios, setPortfolios] = useState([])
  const [transaction, setTransaction] = useState(initial);
  const [saving, setSaving] = useState(false);

  const createTransaction = async () => {
    if (!transaction.investor) {
      alert('An Investor is required!')
      return;
    }
    try {
      setSaving(true)
      transaction.investor = JSON.parse(transaction.investor)
      await addDoc(collection(getFirestore(), 'transactions'), transaction);
      setSaving(false)
      setTransaction(initial)
      closeModal()
    } catch (e) {
      setSaving(false)
      alert('Something went wrong')
    }
  }

  useEffect(() => {
    try {
      const db = getFirestore()
      let q = query(collection(db, 'investors'))
      getDocs(q).then(snapshots => {
        const list = []
        snapshots.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        });
        setPortfolios(list)
      })
    } catch (e) {
    }
  }, []);

  return (
    <>
      <button
        onClick={openModal}
        className='flex items-center shadow h-9 ml-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white flex'>
        <span className='bx bx-dollar-circle text-lg mr-2'/>
        <span>Record Transactions</span>
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
                  className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">

                  {saving &&  <Loading />}

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Record Transaction
                  </Dialog.Title>

                  <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t dark:border-gray-500">

                    <div className='flex flex-col space-y-4'>
                      <div className='flex flex-col space-y-2'>
                        <label htmlFor="investor" className='text-gray-900 dark:text-white'>Investor</label>
                        <select
                          value={transaction.investor}
                          onChange={e => setTransaction(prev => {
                            return {...prev, investor: e.target.value}
                          })}
                          className='px-3 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none'>
                          <option>--Select Portfolio--</option>
                          {portfolios.map(item => <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>)}
                        </select>
                      </div>

                      <div className='flex space-x-4'>
                        <div className='flex-1 flex flex-col space-y-2'>
                          <label htmlFor="portfolio" className=' text-gray-900 dark:text-white'>Money In</label>
                          <input type='text'
                                 value={transaction.moneyIn}
                                 onChange={e => setTransaction(prev => {
                                   return {...prev, moneyIn: e.target.value ? parseFloat(e.target.value) : ''}
                                 })}
                                 className='w-full px-3 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none'
                                 placeholder='0'/>
                        </div>

                        <div className='flex-1 flex flex-col space-y-2'>
                          <label htmlFor="portfolio" className='text-gray-900 dark:text-white'>Money Out</label>
                          <input type='text'
                                 value={transaction.moneyOut}
                                 onChange={e => setTransaction(prev => {
                                   return {...prev, moneyOut: e.target.value ? parseFloat(e.target.value) : ''}
                                 })}
                                 className='w-full px-3 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none'
                                 placeholder='0'/>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col space-y-2'>
                      <label htmlFor="portfolio" className='text-gray-900 dark:text-white'>Description</label>
                      <textarea
                        rows={4}
                        value={transaction.description}
                        onChange={e => setTransaction(prev => {
                          return {...prev, description: e.target.value}
                        })}
                        className='px-3 pt-2 pb-4 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none'
                        placeholder='Description'/>
                    </div>

                    <div className='col-span-2 flex flex-col space-y-2 -mt-2'>
                      <label htmlFor="portfolio" className='text-gray-900 dark:text-white'>Date</label>
                      <input
                        type='date'
                        value={transaction.date}
                        onChange={e => setTransaction(prev => {
                          return {...prev, date: e.target.value}
                        })}
                        className='text-sm px-3 py-1.5 border border-gray-300 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none'
                        placeholder='0'/>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">

                    <button
                      type="button"
                      className="mr-4 px-4 py-1.5 text-gray-600 dark:text-gray-300 hover:text-red-600 rounded-md border border-gray-400 hover:border-red-500"
                      onClick={() => {
                        setTransaction(initial)
                        closeModal()
                      }}
                    >
                      Close
                    </button>

                    <button
                    type="button"
                    className="px-8 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md border-2 border-transparent hover:bg-red-600"
                    onClick={createTransaction}
                  >
                    Create Transaction
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
