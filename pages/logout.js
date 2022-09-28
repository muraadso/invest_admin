import React, {useEffect} from 'react';
import Loading from "../components/loading";
import {getAuth, signOut} from "firebase/auth";

const Logout = () => {

  useEffect(() => {
    signOut(getAuth()).then(() => {
      window.location.href = '/'
    })
  }, []);

  return (
    <div className='w-screen h-screen'>
      <Loading />
    </div>
  );
};

export default Logout;
