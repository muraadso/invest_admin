import React from 'react';
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = ({props, children}) => {
  return (
    <div className='w-screen h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='w-full h-full flex'>
        <Sidebar/>
        <div className='flex-1 flex flex-col'>
          <Header props={props}/>
          <div className='w-full flex-1'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
