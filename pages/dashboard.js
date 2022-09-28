import React from 'react';
import Layout from "../components/layout";
import Stats from "../components/dashboard/stats";
import LatestTransactions from "../components/dashboard/transactions";
import RecentActivity from "../components/dashboard/activity";

const Dashboard = () => {
  return (
    <Layout props={{title: 'Dashboard', icon: 'bx-category'}}>
      <div className='w-full h-full flex flex space-x-8 p-8'>
        <div className='h-full flex-1 flex flex-col space-y-8'>
          <Stats/>
          <LatestTransactions/>
        </div>
        <RecentActivity/>
      </div>
    </Layout>
  );
};

export default Dashboard;
