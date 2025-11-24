import { DomainTask, GetTasksResponse } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        method: "post",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, DomainTask>({
      query: (task) => ({
        method: "put",
        url: `/todo-lists/${task.todoListId}/tasks/${task.id}`,
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
