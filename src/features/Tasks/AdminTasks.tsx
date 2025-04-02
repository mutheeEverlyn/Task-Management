import React from 'react';
import { useGetTasksQuery, TTasks } from './TasksApi';
import { useGetUserByIdQuery } from '../users_management/UsersApi';
import { Toaster } from 'sonner';

const AdminTasks: React.FC = () => {
  const { data: tasks, error, isLoading, isError } = useGetTasksQuery();

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">All Tasks</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">User</th>
              <th className="text-white">Task</th>
              <th className="text-white">Status</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5}>Error: {error?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              tasks?.map((task: TTasks) => {
                const { data: userData } = useGetUserByIdQuery(task.user_id);
                return (
                  <tr key={task.task_id}>
                    <td>{userData?.full_name || 'Loading...'}</td>
                    <td>{task.task}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td>{new Date(task.created_at).toLocaleDateString()}</td>
                    <td>{new Date(task.updated_at).toLocaleDateString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={5}>
                {tasks ? `${tasks.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AdminTasks; 