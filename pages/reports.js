import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import {getFirestore, collection, query, onSnapshot} from "firebase/firestore";
import Loading from "../components/loading";
import CreateTransaction from "../components/transactions/create";
import TransactionsTable from "../components/transactions/datatable";

const Reports = () => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    try {
      const db = getFirestore()
      let q = query(collection(db, 'transactions'))
      onSnapshot(q, (snapshots) => {
        const list = []
        snapshots.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        });
        setTransactions(list)
        setLoading(false)
      })
    } catch (e) {
      setLoading(false)
    }
  }, []);

  if (!loading && transactions.length === 0) {
    return (
      <Layout props={{title: 'Reports', icon: 'bxs-report'}}>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='text-4xl'>
            <i className='bx bxs-report text-gray-500 dark:text-gray-400' />
          </div>
          <span className='mt-2 mb-3 text-gray-600 dark:text-gray-300 text-lg'>No Transactions Yet!</span>
          <CreateTransaction />
        </div>
      </Layout>
    )
  }

  return (
    <Layout props={{title: 'Reports', icon: 'bxs-report'}}>
      {loading && <Loading inContent={true}/>}
      {transactions && transactions.length > 0 && (
        <div className="w-full h-full font-sans px-8 py-4">
          <div className='flex items-center mb-4 px-2'>
            {/*<h1 className='text-lg font-medium text-gray-600 dark:text-gray-400'>Sort</h1>*/}
            <div className='flex-1'/>
            {/*<div*/}
            {/*  className='w-64 h-9 flex items-center space-x-4 px-4 ml-8 mr-4 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600'>*/}
            {/*  <i className='bx bx-search-alt text-gray-400'/>*/}
            {/*</div>*/}
            <CreateTransaction />
          </div>
          <div
            className='w-full h-[calc(100vh-11rem)] overflow-y-auto bg-white dark:bg-transparent border border-gray-300 dark:border-transparent'>
            <TransactionsTable transactions={transactions} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Reports;
