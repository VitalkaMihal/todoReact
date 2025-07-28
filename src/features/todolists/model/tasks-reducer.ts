import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksState = {
    [key: string]: Task[]
}

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction('tasks/createTask', (todolistId: string, title: string) => {
    return {payload: {title, todolistId, id: nanoid()}}
} )
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('task/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('task/changeTaskTitle')
export const deleteAllTasksAC = createAction<{ todolistId: string}>('tasks/deleteAllTasks')

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            console.log(Array.isArray(state[action.payload.todolistId]))
            const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({title: action.payload.title, isDone: false, id: nanoid()})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(todo => todo.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(todo => todo.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })
        .addCase(deleteAllTasksAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
})