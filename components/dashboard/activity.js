const RecentActivity = () => {
  return (
    <div
      className='w-80 h-full flex flex-col py-3 shadow-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg'>
      <div className='flex justify-center pb-3 border-b border-gray-300 dark:border-gray-600 px-4'>
        <h1 className='flex space-x-4 items-center text-lg font-semibold text-gray-800 dark:text-gray-200'>
          <i className='bx bx-time-five'/>
          <span>Recent Activity</span>
        </h1>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <i className='bx bx-bar-chart text-3xl text-black dark:text-gray-200'/>
        <p className='mt-2 text-black dark:text-gray-200'>No Activity Yet!</p>
      </div>
    </div>
  )
}

export default RecentActivity
