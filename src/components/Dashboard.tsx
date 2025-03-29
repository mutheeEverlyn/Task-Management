import React from 'react';
import MyTasksChart from './MyTasksChart';
import { Toaster } from 'sonner';

const Dashboard: React.FC = () => {
  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <Toaster position="top-center" />
      <MyTasksChart />
    </div>
  );
};

export default Dashboard;
