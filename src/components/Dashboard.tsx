import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MyTasksChart from './MyTasksChart';

const Dashboard: React.FC = () => {
  const { user_id } = useOutletContext<{ user_id: number }>();

  return (
    <div className='min-h-screen'>
      <MyTasksChart user_id={user_id} />
    </div>
  );
};

export default Dashboard;
