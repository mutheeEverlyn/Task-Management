import React from 'react';
import { useGetTasksQuery, useDeleteTasksMutation, TTasks } from './TasksApi';
import { Toaster, toast } from 'sonner';

const Tasks: React.FC = () => {
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const { data: Tasks, error, isLoading, isError, refetch } = useGetTasksQuery();
  const [deleteTask, { data: deleteMsg }] = useDeleteTasksMutation();

  const handleUpdate = async (task: TTasks) => {
    
  };

  const MyTasks = Tasks?.filter((task: TTasks) => task.user_id === user_id);

  const handleDelete = async (task_id: number) => {
    await deleteTask(task_id);
    toast.success(deleteMsg?.msg || 'task deleted successfully');
    refetch();
  };

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
      <div className="overflow-x-auto bg-gray-800 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My Tasks</h1>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">tasks</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7}>Error: {error?.message || 'An error occurred'}</td>
              </tr>
            ) : (
              MyTasks?.map((task: TTasks) => (
                <tr key={task.task_id}>
                  <td>{task.task}</td> 
                  <td>{task.created_at}</td>
                  <td>{task.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(task.task_id)}>
                      cancel
                    </button>
                   
                      <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(task)}>
                        update
                      </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-white" colSpan={7}>
                {MyTasks ? `${MyTasks.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Tasks;
