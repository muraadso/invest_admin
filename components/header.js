import React, {useEffect, useState} from 'react';

const Header = ({props}) => {

  const [theme, setTheme] = useState('');

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      window.localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('dark')
    }
  }, []);


  if (props?.headless) {
    return null;
  }

  return (
    <div
      className='w-full h-20 flex items-center z-10 px-8 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600'>
      {props?.canGoBack && (
        <i
          onClick={() => window.history.go(-1)}
          className={`bx bx-arrow-back text-2xl text-gray-800 dark:text-gray-200 cursor-pointer mr-4`}/>
      )}
      {!props?.canGoBack && <i className={`bx ${props?.icon} text-2xl text-gray-800 dark:text-gray-200`}/>}
      <h1 className='text-xl ml-4 text-gray-800 dark:text-gray-200'>{props?.title}</h1>
      <div className='flex-1 flex justify-end items-center py-2'>
        <i
          onClick={() => switchTheme()}
          className={`bx ${theme === 'light' ? 'bxs-moon' : 'bxs-sun'} text-xl cursor-pointer mr-8 text-gray-400 dark:text-gray-200`}></i>
        <div className='flex items-center mr-8'>
          <div className={`bx bxs-bell text-xl cursor-pointer text-gray-400 dark:text-gray-200`}></div>
          <div className='bg-red-500 w-2 h-2 rounded-full self-start'/>
        </div>
        <div className='flex flex-col items-end pl-8 border-l border-gray-300 dark:border-gray-600'>
          <p className='mr-4 text-sm text-gray-800 dark:text-gray-200'>User</p>
          <p className='mr-4 text-gray-400 text-sm'>Admin</p>
        </div>
        <img src="/avatar.png" className='w-12 border border-gray-400 rounded-full' alt=""/>
      </div>
    </div>
  );
};

export default Header;
