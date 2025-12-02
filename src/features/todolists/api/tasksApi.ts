import { DomainTask, GetTasksResponse } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        method: "post",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, DomainTask>({
      query: (task) => ({
        method: "put",
        url: `/todo-lists/${task.todoListId}/tasks/${task.id}`,
        body: task,
      }),
      async onQueryStarted(task, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasks",
                { todolistId: task.todoListId, params: { page: params.page } },
                (state) => {
                  const index = state.items.findIndex((t) => t.id === task.id)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...task }
                  }
                },
              ),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_res, _err, { todoListId }) => [{ type: "Task", id: todoListId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
