import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "./todolists-slice.ts"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: Task[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state.todolistId?.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state.todolistId?.splice(index, 1)
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const index = state.todolistId.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state.todolistId[index].title = action.payload.title
      }
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const index = state.todolistId.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state.todolistId[index].isDone = action.payload.isDone
      }
    }),
    createTaskAC: create.preparedReducer(
      (todolistId: string, title: string) => ({ payload: { title, todolistId, id: nanoid() } }),
      (state, action) => {
        state[action.payload.todolistId].push({ id: action.payload.id, title: action.payload.title, isDone: false })
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

export const { deleteTaskAC, changeTaskTitleAC, changeTaskStatusAC, createTaskAC } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
