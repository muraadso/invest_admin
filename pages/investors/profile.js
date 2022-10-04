import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import {useRouter} from "next/router";
import {collection, doc, getDoc, getFirestore, onSnapshot, query} from "firebase/firestore";
import Loading from "../../components/loading";
import TransactionsTable from "../../components/transactions/datatable";
import {DeleteFilled, DeleteOutlined, FormOutlined} from "@ant-design/icons";
import Statement from "../../components/statement";

const Profile = () => {

  const router = useRouter()
  const {q} = router.query

  const [investor, setInvestor] = useState();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    setLoadingTransactions(true)
    try {
      const db = getFirestore()
      let q = query(collection(db, 'transactions'))
      onSnapshot(q, (snapshots) => {
        const list = []
        snapshots.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        });
        setTransactions(list)
        setLoadingTransactions(false)
      })
    } catch (e) {
      setLoadingTransactions(false)
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (!q) {
        setError(true)
        return
      }
      getDoc(doc(collection(getFirestore(), 'investors'), q)).then((snapshot) => {
        setLoading(false)
        if (!snapshot.exists()) {
          setError(true)
        } else {
          setInvestor(snapshot.data())
        }
      })
    }
  }, [router.isReady, q]);

  if (error) {
    return <p>Error</p>
  }

  return (
    <Layout props={{title: investor?.name + '(' + investor?.id + ')' ?? '-----', icon: 'bx-user'}}>
      {loading ? (
        <Loading inContent={true}/>
      ) : (
        <div className='w-full flex py-8 px-16'>
          <div className='w-full flex flex-col'>
            {loadingTransactions ? null : <Info investor={investor} transactions={transactions} />}
            {/*<p className='mt-12 font-medium text-lg mb-4'>Investor Transactions</p>*/}
            {loadingTransactions ? null : <TransactionsTable transactions={transactions} />}
          </div>
        </div>
      )}
    </Layout>
  );
};

const Info = ({investor, transactions}) => {
  return (
    <div className='w-full flex items-start space-x-14 mt-4 mb-8'>
      <div className='flex flex-col space-y-4'>
        <img className='h-40 object-cover border border-red-500 rounded-md' src={investor['photo']} alt=""/>
      </div>
      <div className='flex-1 grid grid-cols-6 gap-4'>
        <p className='text-gray-500'>Info:</p>
        <p className='col-span-5 text-black dark:text-white font-semibold'>
          <span className='font-normal text-gray-500 mr-2'>Phone Number </span>({investor.phoneNumber}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Location </span>({investor.city} {investor.address}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Work </span>({investor.work}),
        </p>
        <p className='text-gray-500'>Next of Kin:</p>
        <p className='col-span-5 text-black dark:text-white font-semibold'>
          <span className='font-normal text-gray-500 mr-2'>Name: </span>({investor.nextOfKin}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Relation: </span>({investor.nextOfKinRelationship}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Phone : </span>({investor.nextOfKinPhoneNumber})
        </p>
        <p className='text-gray-500'>Investment:</p>
        <p className='col-span-5 text-black dark:text-white font-semibold'>
          <span className='font-normal text-gray-500 mr-2'>Amount:</span>(${investor.investmentAmount}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Withdraws: </span>({investor.withdrawalOption}),
          <span className='font-normal text-gray-500 ml-4 mr-2'>Durations:</span> ({investor.investmentDuration})
        </p>
        <div className='col-span-6 flex justify-start items-center'>
          <a href={'/investors/create?edit=' + investor.id} className={'bx bx-edit text-blue-500 cursor-pointer hover:scale-110 text-xl mr-4'} />
          <i className={'bx bx-trash text-red-500 cursor-pointer hover:scale-110 text-xl'} />
          <Statement transactions={transactions} />
        </div>
      </div>
    </div>
  )
}

export default Profile;
