import { expect, test } from "vitest"
import { createTodolistAC, TodoList, todolistsReducer } from "../todolists-slice.ts"
import { tasksReducer, TasksState } from "../tasks-reducer.ts"

test("ids should be equals", () => {
  const startTasksState: TasksState = {}
  const startTodolistsState: Array<TodoList> = []

  const action = createTodolistAC("new todolist")
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const IdFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTodolists).toBe(action.payload.id)
  expect(IdFromTasks).toBe(action.payload.id)
})
