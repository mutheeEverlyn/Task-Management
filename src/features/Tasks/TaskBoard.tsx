import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useGetTasksQuery, useCreateTasksMutation, useUpdateTasksMutation, useDeleteTasksMutation, TTasks } from './TasksApi';
import { Toaster, toast } from 'sonner';
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskBoard: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const { data: tasks, error, isLoading, isError, refetch } = useGetTasksQuery();
  const [addTask] = useCreateTasksMutation();
  const [updateTask] = useUpdateTasksMutation();
  const [deleteTask] = useDeleteTasksMutation();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await addTask({
        task: newTask,
        status: 'pending',
        user_id: user_id,
        order: tasks?.length || 0
      });
      setNewTask('');
      toast.success('Task added successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const myTasks = tasks?.filter((task: TTasks) => task.user_id === user_id) || [];
    const reorderedTasks = Array.from(myTasks) as TTasks[];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    try {
      // Update the moved task with its new order
      if (movedTask) {
        const updatedMovedTask: TTasks = {
          task_id: movedTask.task_id,
          user_id: movedTask.user_id,
          status: movedTask.status,
          task: movedTask.task,
          created_at: movedTask.created_at,
          updated_at: movedTask.updated_at,
          order: result.destination.index
        };
        await updateTask(updatedMovedTask);
      }

      // Update the order of affected tasks
      for (let i = 0; i < reorderedTasks.length; i++) {
        const task = reorderedTasks[i];
        if (task.order !== i) {
          const updatedTask: TTasks = {
            task_id: task.task_id,
            user_id: task.user_id,
            status: task.status,
            task: task.task,
            created_at: task.created_at,
            updated_at: task.updated_at,
            order: i
          };
          await updateTask(updatedTask);
        }
      }

      toast.success('Task reordered successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to reorder task');
    }
  };

  const handleStatusUpdate = async (task: TTasks) => {
    try {
      const updatedTask: TTasks = {
        task_id: task.task_id,
        user_id: task.user_id,
        status: task.status === 'completed' ? 'pending' : 'completed',
        task: task.task,
        created_at: task.created_at,
        updated_at: task.updated_at,
        order: task.order
      };
      await updateTask(updatedTask);
      toast.success('Task status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  // Sort tasks by order and filter by current user
  const myTasks = tasks
    ?.filter((task: TTasks) => task.user_id === user_id)
    .sort((a: TTasks, b: TTasks) => ((a.order ?? 0) - (b.order ?? 0)));

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
      <div className="bg-amber-300 text-white rounded-lg p-4 min-h-screen">
        <h1 className="text-xl my-4">My Tasks</h1>
        
        {/* Task Creation Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="input input-bordered w-full max-w-xs bg-gray-700 text-white"
            />
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>

        {/* Drag and Drop Task List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {isLoading ? (
                  <div>Loading...</div>
                ) : isError ? (
                  <div>Error: {error?.message || 'An error occurred'}</div>
                ) : myTasks && myTasks.length > 0 ? (
                  myTasks.map((task: TTasks, index: number) => (
                    <Draggable
                      key={task.task_id}
                      draggableId={task.task_id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-600 transition-colors duration-200 ${
                            snapshot.isDragging ? 'bg-gray-600 shadow-lg' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-gray-400 cursor-move">
                              ⋮⋮
                            </div>
                            <div>
                              <h3 className="font-semibold">{task.task}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                task.status === 'completed' ? 'bg-green-500' :
                                task.status === 'in-progress' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className={`btn btn-sm btn-outline ${
                                task.status === 'completed' ? 'btn-success' : 'btn-info'
                              }`}
                              onClick={() => handleStatusUpdate(task)}
                            >
                              {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
                            </button>
                            <button
                              className="btn btn-sm btn-error btn-outline"
                              onClick={() => handleDeleteTask(task.task_id)}
                            >
                              <RiDeleteBin6Line />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    No tasks found. Add a new task to get started!
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default TaskBoard;