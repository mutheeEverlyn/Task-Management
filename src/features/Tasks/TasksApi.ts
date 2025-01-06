import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TTasks{
    task_id:number;
    user_id:number;
    task:string;
    created_at:string;
    updated_at:string;
    msg?: string;
  }

export const taskAPI = createApi({
  reducerPath: 'taskAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails')||'{}');
      const token=userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
        
      }
      return headers;
    },
  }),
  tagTypes: ['tasks'],
  endpoints: (builder) => ({
    getTasksById:builder.query<TTasks,number>({
      query:(user_id)=>`tasks/${user_id}`,
      providesTags:['tasks'],
    }),
    getTasks: builder.query<TTasks[], void>({
      query: () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const user_id = userDetails?.user_id;
        return `tasks?user_id=${user_id}`;
      },
      providesTags: ['tasks'],
    }),
    createTasks: builder.mutation<TTasks, Partial<TTasks>>({
      query: (newtasks) => ({
        url: 'tasks',
        method: 'POST',
        body: newtasks,
      }),
      invalidatesTags: ['tasks'],
    }),
    updateTasks: builder.mutation<TTasks, Partial<TTasks>>({
      query: ({ task_id, ...rest }) => ({
        url: `tasks/${task_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['tasks'],
    }),
    deleteTasks: builder.mutation<{ success: boolean; task_id: number }, number>({
      query: (task_id) => ({
        url: `tasks/${task_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tasks'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetTasksByIdQuery,
  useGetTasksQuery,
  useCreateTasksMutation,
  useUpdateTasksMutation,
  useDeleteTasksMutation,
}:any = taskAPI;
