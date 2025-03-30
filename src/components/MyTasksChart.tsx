import React from 'react';
import { useGetTasksQuery, TTasks } from '../features/Tasks/TasksApi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyTasksChart: React.FC = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Error loading tasks</div>
      </div>
    );
  }

  // Filter tasks for the current user
  const taskList = tasks?.filter((task: TTasks) => task.user_id === user_id) || [];

  // Process tasks data for the chart
  const taskData = {
    labels: ['Total Tasks', 'Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        label: 'Task Statistics',
        data: [
          taskList.length,
          taskList.filter((task: TTasks) => task.status === 'completed').length,
          taskList.filter((task: TTasks) => task.status === 'in-progress').length,
          taskList.filter((task: TTasks) => task.status === 'pending').length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Task Statistics',
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaTasks className="text-blue-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm">Total Tasks</h3>
              <p className="text-2xl font-bold">{taskList.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm">Completed</h3>
              <p className="text-2xl font-bold text-green-500">
                {taskList.filter((task: TTasks) => task.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaClock className="text-yellow-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm">In Progress</h3>
              <p className="text-2xl font-bold text-yellow-500">
                {taskList.filter((task: TTasks) => task.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-500 text-2xl mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm">Pending</h3>
              <p className="text-2xl font-bold text-red-500">
                {taskList.filter((task: TTasks) => task.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Bar options={options} data={taskData} />
      </div>

      {/* Recent Tasks List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taskList.slice(0, 5).map((task: TTasks) => (
                  <tr key={task.task_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.task}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(task.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasksChart;