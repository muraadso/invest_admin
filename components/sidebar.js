import React from 'react';
import {useRouter} from "next/router";
import {AppstoreAddOutlined, TeamOutlined, DollarCircleOutlined, ExceptionOutlined, LogoutOutlined} from "@ant-design/icons";

const Sidebar = () => {

  const items = [
    {icon: <AppstoreAddOutlined style={{ fontSize: '20px'}}/>, path: '/dashboard', label: 'Dashboard'},
    {icon: <TeamOutlined style={{ fontSize: '20px'}}/>, path: '/investors', label: 'Investors'},
    {icon: <DollarCircleOutlined style={{ fontSize: '20px'}} />, path: '/transactions', label: 'Transactions'},
    {icon: <ExceptionOutlined style={{ fontSize: '20px'}} />, path: '/reports', label: 'Reports'},
    {icon: <LogoutOutlined style={{ fontSize: '20px'}} />, path: '/logout', label: 'Logout'},
  ]

  const {pathname} = useRouter()

  return (
    <div className='w-64 h-full relative sticky top-0 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'>
      <img src='/sidebar.png' className='-z-10 absolute w-full h-full object-cover opacity-10 dark:opacity-5' alt=''/>
      <div className='w-full h-full flex flex-col items-center'>
        <img src="/brand_light.png" className='w-14 my-4 rounded-full border-4 border-red-500' alt=""/>
        <div className='w-full px-10 py-4'>
          <hr className='h-0.5 bg-zinc-300 dark:bg-gray-500 border-0'/>
        </div>
        <ul className='w-full h-full flex flex-col items-end px-10 overflow-y-auto'>
          {items.map(item => {
            const isActive = pathname.includes(item.path)
            return (
              <li key={item.path}
                  className={`w-full my-3 py-1 px-4 font-semibold ${isActive ? 'text-red-500 dark:text-white bg-white dark:bg-transparent border-2 border-red-500 dark:border-white rounded-lg shadow cursor-pointer' : 'text-gray-500 dark:text-gray-300 hover:text-red-500'}`}>
                <a href={item.path} className='w-full h-full flex items-center space-x-4'>
                  {/*<i className={`bx ${item.icon} text-2xl hover:text-white`}/>*/}
                  {item.icon}
                  <p className='text-lg'>{item.label}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
