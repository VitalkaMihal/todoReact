import { createTodolistAC, deleteTodolistAC } from "./todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/common/instance/tasksApi.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

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
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
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
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const index = state.todolistId.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state.todolistId[index].title = action.payload.title
      }
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
      }
    }),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await tasksApi.createTask(payload)
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { fetchTasksTC, createTaskTC, deleteTaskTC, changeTaskTitleAC, changeTaskStatusAC } = tasksSlice.actions

export const { selectTasks } = tasksSlice.selectors

export const tasksReducer = tasksSlice.reducer
