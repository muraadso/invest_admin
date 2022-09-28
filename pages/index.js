import React, {useState} from 'react';
import Loading from "../components/loading";

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const LoginPage = () => {

  const [cred, setCred] = useState({email: '', passwd: ''})

  const [signingIn, setSigningIn] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (cred.email && cred.passwd) {
      setSigningIn(true)
      signInWithEmailAndPassword(getAuth(), cred.email, cred.passwd)
        .then(async () => {
          window.location.href = '/dashboard'
        }).catch(e => {
          alert(e.message)
          setSigningIn(false)
        })
    } else {
      alert('Email and password are required')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full h-screen flex justify-center items-center p-8 bg-red-500'>
        {signingIn && <Loading/>}
        <img className='w-full h-full absolute object-cover inset-0 z-10 opacity-20' src='/background.png' alt=''/>
        <div
          className="w-full max-w-sm mx-auto flex flex-col items-start justify-start z-20 p-10 bg-white shadow-xl rounded-xl">
          <h4 className="w-full text-4xl font-medium leading-snug text-center">Login</h4>
          <form
            onSubmit={submit}
            className="relative w-full mt-6 space-y-8">
            <div className="relative">
              <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Email</label>
              <input type="text"
                     value={cred.email}
                     onChange={e => setCred({...cred, email: e.target.value})}
                     className="block w-full px-4 py-3 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                     placeholder="example@muraadso.com"/>
            </div>
            <div className="relative">
              <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Password</label>
              <input type="password"
                     value={cred.passwd}
                     onChange={e => setCred({...cred, passwd: e.target.value})}
                     className="block w-full px-4 py-3 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                     placeholder="********"/>
            </div>
            <div className="relative">
              <button
                type='submit'
                className="inline-block w-full px-5 py-2.5 text-lg font-medium text-center text-white transition-all duration-250 border-2 border-transparent rounded-xl bg-black hover:bg-white hover:text-black hover:border-black">Submit
              </button>
              <p className='mt-4 text-gray-500 text-center cursor-not-allowed'>Forgot Password?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
