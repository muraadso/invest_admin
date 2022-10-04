import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore, query} from "firebase/firestore";

const Stats = () => {

  const [stats, setStats] = useState({amount: '...', investors: '...', transactions: '...'});

  useEffect(() => {
    try {
      const db = getFirestore()
      let investorsQ = query(collection(db, 'investors'))
      let transactionsQ = query(collection(db, 'transactions'))
      getDocs(investorsQ).then(snapshots => {
        const size = snapshots.size;
        let amount = 0;
        snapshots.forEach(it => amount += it.data()['investmentAmount'])
        setStats(prevState => {
          return {...prevState, amount: amount, investors: size}
        })
      })
      getDocs(transactionsQ).then(snapshots => {
        const size = snapshots.size;
        setStats(prevState => {
          return {...prevState, transactions: size}
        })
      })
    } catch (e) {
    }
  }, []);

  return (
    <div className='w-full h-24 grid grid-cols-3 gap-6'>
      <div
        className='flex items-end px-6 pb-4 bg-white shadow-sm dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg'>
        <div className="flex-1 flex flex-col">
          <h1 className='mb-2 text-2xl text-black dark:text-white font-black'>{stats.investors}</h1>
          <h1 className='text-base text-gray-500 dark:text-gray-200'>All Investors</h1>
        </div>
        <i className='bx bxs-group text-black dark:text-white text-4xl'/>
      </div>

      <div
        className='flex items-end px-6 pb-4 bg-white shadow-sm dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg'>
        <div className="flex-1 flex flex-col">
          <h1 className='mb-2 text-2xl text-black dark:text-white font-black'>{stats.amount}</h1>
          <h1 className='text-base text-gray-500 dark:text-gray-200'>Total Investment</h1>
        </div>
        <i className='bx bx-donate-blood text-black dark:text-white text-4xl'/>
      </div>

      <div
        className='flex items-end px-6 pb-4 bg-white shadow-sm dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg'>
        <div className="flex-1 flex flex-col">
          <h1 className='mb-2 text-2xl text-black dark:text-white font-black'>{stats.transactions}</h1>
          <h1 className='text-base text-gray-500 dark:text-gray-200'>Transactions</h1>
        </div>
        <i className='bx bx-dollar-circle text-black dark:text-white text-4xl'/>
      </div>
    </div>
  )
}

export default Stats
