import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import {getFirestore, collection, getDocs, query, orderBy, deleteDoc, doc} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../components/loading";

const Investors = () => {

  const [search, setSearch] = useState('');
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState('date');

  const deleteInvestor = async investor => {
    if (confirm('Delete investor (' + investor.name + ')')) {
      const db = getFirestore()
      const col = collection(db, 'investors')
      try {
        setLoading(true)
        await deleteDoc(doc(col, investor.id))
        setInvestors(prevState => {
          return prevState.filter(item => item.id !== investor.id)
        })
        setLoading(false)
      } catch (e) {
        setLoading(false)
        alert('Oops!\ncouldn\'t delete investor data!')
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    try {
      const db = getFirestore()
      let q = query(collection(db, 'investors'))
      if (sort === 'date') {
        q = query(q, orderBy('timestamp', 'desc'))
      } else if (sort === 'capital') {
        q = query(q, orderBy('investmentAmount', 'desc'))
      } else if (sort === 'location') {
        q = query(q, orderBy('city'))
      }
      getDocs(q).then(snapshots => {
        const list = []
        snapshots.forEach((doc) => {
          list.push({...doc.data()})
        });
        setInvestors(list)
        setLoading(false)
      })
    } catch (e) {
      setLoading(false)
    }
  }, [sort]);

  useEffect(() => {
    if (!search) {
      setFilteredInvestors(investors)
      return
    }
    setFilteredInvestors(investors.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
  }, [investors, search]);

  if (!loading && investors.length === 0) {
    return (
      <Layout props={{title: 'Investors', icon: 'bx-group'}}>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='text-4xl'>
            🧐
          </div>
          <span className='my-4 text-gray-600 dark:text-gray-300 text-lg'>No Investors Yet!</span>
          <Link href='/investors/create'
                className=''>
            <div className='flex items-center h-9 ml-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white flex'>
              <span className='bx bx-user-plus text-lg mr-2'/>
              <span>Register Investors</span>
            </div>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout props={{title: 'Investors', icon: 'bx-group'}}>
      {loading && <Loading inContent={true}/>}
      {investors && investors.length > 0 && (
        <div className="w-full h-full font-sans px-8 py-4">
          <div className='flex items-center mb-4 px-2'>
            <h1 className='text-lg font-medium text-gray-600 dark:text-gray-400'>Sort</h1>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className='h-9 ml-4 px-1.5 outline-none dark:text-gray-300 dark:bg-transparent rounded-md border border-gray-300 dark:border-gray-500'>
              <option value="date">By Date</option>
              <option value="capital">By Capital</option>
              <option value="location">By Location</option>
            </select>
            <div className='flex-1'/>
            <div
              className='w-64 h-9 flex items-center space-x-4 px-4 ml-8 mr-4 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600'>
              <i className='bx bx-search-alt text-gray-400'/>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='h-full flex-1 text-black dark:text-white outline-none bg-transparent'
                placeholder='Search'/>
            </div>
            <Link href='/investors/create'>
              <div
                className='h-9 px-4 space-x-2 flex items-center ml-2 rounded-md bg-red-500 hover:bg-red-600 text-white'>
                <span className='bx bx-user-plus text-lg'/>
                <span>NEW</span>
              </div>
            </Link>
          </div>
          <div
            className='w-full h-[calc(100vh-11rem)] overflow-y-auto bg-white dark:bg-transparent border border-gray-300 dark:border-transparent'>
            <table className="w-full table-auto border-separate ">
              <thead className='sticky top-0 z-10 border border-gray-300 dark:border-transparent'>
              <tr
                className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">ID</th>
                <th className="py-3 px-6 text-center">Photo</th>
                <th className="py-3 px-6 text-left">Full Name</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-center">Amount</th>
                <th className="py-3 px-6 text-center">Duration</th>
                <th className="py-3 px-6 text-center">City</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
              </thead>
              <tbody className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm font-light">
              {filteredInvestors && filteredInvestors.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className={`border border-gray-300 dark:border-gray-500 ${index % 2 !== 0 ? 'bg-white dark:bg-transparent' : 'bg-transparent'} hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer`}>
                    <td className="py-3 px-6 text-left">
                      <span className='font-medium'>{item.id}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <Image
                          alt=''
                          width='24'
                          height='24'
                          loader={() => item.photo}
                          className="rounded-full border-gray-200 dark:border-gray-500 border transform hover:scale-125"
                          src={item.photo}/>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className='font-medium'>{item.name}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className='font-medium'>{item.phoneNumber}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                    <span
                      className="bg-purple-200 text-purple-800 font-medium py-1 px-3 rounded-full text-xs">USD{item.investmentAmount}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className='font-medium'>{item.investmentDuration}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className='font-medium'>{item.city}</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div onClick={() => window.location.href = '/investors/profile?q=' + item.id}>
                          <i className='bx bx-show text-xl transform hover:text-purple-500 hover:scale-110' />
                        </div>
                        <div
                          onClick={() => {
                            window.location.href = '/investors/create?edit=' + item.id
                          }}
                          className="mx-4 transform hover:text-purple-500 hover:scale-110">
                          <i className='bx bx-edit text-lg transform hover:text-purple-500 hover:scale-110' />
                        </div>
                        <div
                          onClick={() => deleteInvestor(item)}
                          className="mr-2 transform hover:text-purple-500 hover:scale-110">
                          <i className='bx bx-trash text-lg transform hover:text-purple-500 hover:scale-110' />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Investors;
