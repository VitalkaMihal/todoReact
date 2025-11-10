import { beforeEach, expect, test } from "vitest"
import { createTaskAC, deleteAllTasksAC, deleteTaskAC, deleteTaskTC, tasksReducer } from "../tasks-slice.ts"
import { createTodolistAC, deleteTodolistAC } from "../todolists-slice.ts"
import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

let startState = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ taskId: "2", todolistId: "todoList2" }, "", { taskId: "2", todolistId: "todoList2" }),
  )

  expect(endState["todoList1"].length).toBe(3)
  expect(endState["todoList2"].length).toBe(2)
  expect(endState["todoList2"].every((t) => t.id !== "2")).toBeTruthy()
  expect(endState["todoList2"][0].id).toBe("1")
  expect(endState["todoList2"][1].id).toBe("3")
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, createTaskAC("todoList2", "sugar"))

  expect(endState["todoList2"]?.length).toBe(4)
  expect(endState["todoList1"]?.length).toBe(3)
  expect(endState["todoList2"][0].id).toBeDefined()
  expect(endState["todoList2"][0].title).toBe("sugar")
  expect(endState["todoList2"][0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const endState = tasksReducer(startState, changeTaskStatusAC({ todolistId: "todoList2", taskId: "3", isDone: true }))

  expect(endState["todoList2"][2].isDone).toBeTruthy()
  expect(endState["todoList1"][2].isDone).toBeFalsy()
})

test("all tasks should be deleted to correct array", () => {
  const endState = tasksReducer(startState, deleteAllTasksAC({ todolistId: "todoList2" }))

  expect(endState["todoList2"].length).toBe(0)
  expect(endState["todoList1"].length).toBe(3)
})

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({ todolistId: "todoList2", taskId: "2", title: "coffee" }),
  )

  expect(endState["todoList2"][1].title).toBe("coffee")
  expect(endState["todoList1"][1].title).toBe("JS")
})

test("new property with new array should be added when new todolist added", () => {
  const endState = tasksReducer(startState, createTodolistAC("todoList3"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todoList1" && k != "todoList2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("correct tasks should be deletes when todolist deleted", () => {
  const endState = tasksReducer(startState, deleteTodolistAC({ id: "todoList2" }))

  expect(Object.keys(endState).length).toBe(1)
  expect(endState["todoList1"]).toBeDefined()
  expect(endState["todoList2"]).toBeUndefined()
})
