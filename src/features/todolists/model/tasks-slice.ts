import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/common/instance/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums/enums"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload)
          return payload
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        const { id, todoListId } = task

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
        }

        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ todoListId, taskId: id, model })
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.task.todoListId].findIndex((task) => task.id === action.payload.task.id)
          if (index !== -1) {
            state[action.payload.task.todoListId][index] = { ...action.payload.task }
          }
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.createTask(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            if (res.data.messages.length) {
              dispatch(setAppErrorAC({ error: res.data.messages[0] }))
            } else {
              dispatch(setAppErrorAC({ error: "Some error occurred" }))
            }
            dispatch(setAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
  }),
})

export const { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions

export const { selectTasks } = tasksSlice.selectors

export const tasksReducer = tasksSlice.reducer
