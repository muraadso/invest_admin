import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import {getFirestore, collection, doc, getDoc, setDoc, serverTimestamp} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import Loading from "../../components/loading";
import {useRouter} from "next/router";

const CreateInvestor = () => {

  const initial = {
    name: '',
    phoneNumber: '',
    city: '',
    address: '',
    work: '',
    nextOfKin: '',
    nextOfKinPhoneNumber: '',
    nextOfKinRelationship: '',
    investmentAmount: 0,
    investmentDuration: '',
    withdrawalOption: undefined,
  }

  const router = useRouter()
  const {edit} = router.query

  const [investor, setInvestor] = useState(initial)
  const [creating, setCreating] = useState(false);

  const [image, setImage] = useState({url: '', data: ''});

  const createPortfolio = async () => {
    setCreating(true)
    try {
      const db = getFirestore()
      const col = collection(db, 'investors')
      const idRef = edit ? edit : doc(col).id
      if (!image) {
        setCreating(false)
        alert('Photo is required!')
        return
      }
      const isEmpty = Object.values(investor).some(it => it === null || it === '');
      if (isEmpty) {
        setCreating(false)
        alert('All fields are required!')
        return
      }
      if (image !== investor.photo) {
        investor.photo = await uploadPhoto(idRef)
        investor.timestamp = serverTimestamp()
      }
      await setDoc(doc(col, idRef), investor)
      if (edit) {
        window.location.href = '/investors'
        alert('Successfully updated investor!')
      } else {
        setInvestor(initial)
        setImage({url: '', data: ''})
        setCreating(false)
        alert('Successfully created investor!')
      }
    } catch (e) {
      console.log(e)
      setCreating(false)
    }
  }

  const uploadPhoto = async (idRef) => {
    const storage = getStorage()
    const storageRef = ref(storage, 'photos/' + idRef)
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, image.data)
      uploadTask.on('state_changed',
        (_) => null,
        (error) => {
          reject(error)
          throw error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      );
    })
  }

  useEffect(() => {
    if (router.isReady) {
      try {
        if (edit) {
          setCreating(true)
          const db = getFirestore()
          getDoc(doc(collection(db, 'investors'), edit)).then((doc) => {
            setInvestor({...doc.data()})
            setImage({url: doc.data()['photo']})
            setCreating(false)
          })
        }
      } catch (e) {
        console.log(e)
        setCreating(false)
      }
    }
  }, [edit, router.isReady]);

  return (
    <Layout props={{title: 'Add Investor', icon: 'bx-user', canGoBack: true}}>
      {creating && <Loading/>}
      <div className="w-full h-[calc(100vh-5rem)] py-8 overflow-y-auto">
        <div className='w-full max-w-5xl mx-auto flex space-x-11'>
          <div className="flex-1 flex flex-col">
            <p className='text-gray-600 dark:text-gray-300 mb-4 pb-2 border-b dark:border-gray-500'>Basic Info</p>
            <div className='w-full grid grid-cols-3 gap-6'>
              <div className='col-span-2 flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Full Name</label>
                <input
                  disabled={creating}
                  value={investor.name}
                  onChange={e => setInvestor(prev => {
                    return {...prev, name: e.target.value}
                  })}
                  className='col-span-2 px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Full Name'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Phone Number</label>
                <input
                  disabled={creating}
                  value={investor.phoneNumber}
                  onChange={e => setInvestor(prev => {
                    return {...prev, phoneNumber: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Phone Number'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="city">City</label>
                <input
                  disabled={creating}
                  value={investor.city}
                  onChange={e => setInvestor(prev => {
                    return {...prev, city: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='City'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Address</label>
                <input
                  disabled={creating}
                  value={investor.address}
                  onChange={e => setInvestor(prev => {
                    return {...prev, address: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Address'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Work</label>
                <input
                  disabled={creating}
                  value={investor.work}
                  onChange={e => setInvestor(prev => {
                    return {...prev, work: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Work'/>
              </div>
            </div>

            <p className='text-gray-600 dark:text-gray-300 mb-4 mt-6 pb-2 border-b dark:border-gray-500'>Next of Kin</p>
            <div className='w-full grid grid-cols-3 gap-6'>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Full Name</label>
                <input
                  disabled={creating}
                  value={investor.nextOfKin}
                  onChange={e => setInvestor(prev => {
                    return {...prev, nextOfKin: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Full Name'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Phone Number</label>
                <input
                  disabled={creating}
                  value={investor.nextOfKinPhoneNumber}
                  onChange={e => setInvestor(prev => {
                    return {...prev, nextOfKinPhoneNumber: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Phone Number'/>
              </div>
              <div className='flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Relationship</label>
                <input
                  disabled={creating}
                  value={investor.nextOfKinRelationship}
                  onChange={e => setInvestor(prev => {
                    return {...prev, nextOfKinRelationship: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Relationship'/>
              </div>
            </div>

            <p className='text-gray-600 dark:text-gray-300 mb-4 mt-6 pb-2 border-b dark:border-gray-500'>Investment Info</p>
            <div className='w-full grid grid-cols-9 gap-6'>
              <div className='col-span-2 flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Amout</label>
                <input
                  disabled={creating}
                  value={investor.investmentAmount}
                  onChange={e => setInvestor(prev => {
                    return {...prev, investmentAmount: e.target.value ? parseFloat(e.target.value) : ''}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Amount'/>
              </div>
              <div className='col-span-3 flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Duration</label>
                <input
                  disabled={creating}
                  value={investor.investmentDuration}
                  onChange={e => setInvestor(prev => {
                    return {...prev, investmentDuration: e.target.value}
                  })}
                  className='px-3 py-1.5 bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 text-black dark:text-white outline-none'
                  type="text" placeholder='Duration'/>
              </div>
              <div className='col-span-4 flex flex-col space-y-2'>
                <label className='text-black dark:text-gray-300' htmlFor="name">Withdrawal Option</label>
                <select
                  disabled={creating}
                  value={investor.withdrawalOption}
                  onChange={e => setInvestor(prev => {
                    return {...prev, withdrawalOption: e.target.value}
                  })}
                  className='px-2 py-1.5 dark:text-white bg-white dark:bg-gray-600 rounded-md border border-gray-400 dark:border-gray-500 outline-none'>
                  <option selected disabled>--Withdrawal Option--</option>
                  <option value='Monthly'>Monthly</option>
                  <option value='Quarterly'>Quarterly</option>
                  <option value='Annually'>Annually</option>
                </select>
              </div>
            </div>

            <button
              onClick={createPortfolio}
              className='flex justify-center items-center px-3 py-2 mt-10 bg-red-500 text-white rounded-md shadow-xl'>
              Create and Finish
            </button>
          </div>
          <div className="w-64 flex flex-col mt-10">
            <img src={image?.url ? image?.url : image?.data ? URL.createObjectURL(image?.data) : "/investor.png"}
                 alt=""
                 className={`w-full border border-gray-300 dark:border-gray-600 ${image.data || image.url ? 'rounded-lg' : 'rounded-full'}`}/>
            <div className='relative mt-6'>
              <input
                onClick={e => e.target.value = null}
                onChange={e => setImage({data: e.target.files[0], url: URL.createObjectURL(e.target.files[0])})}
                className='absolute w-full h-full opacity-0'
                type="file"/>
              <button className='w-full px-3 py-2 bg-gray-500 text-white rounded-md shadow-sm'>Upload Photo</button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInvestor;
