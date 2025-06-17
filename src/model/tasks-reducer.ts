import type {TasksState} from '../App'
import {createTodolistAT, deleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";


type createTaskAT = ReturnType<typeof createTaskAC>
type deleteTaskAT = ReturnType<typeof deleteTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type deleteAllTasksAT = ReturnType<typeof deleteAllTasksAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type TasksActionType = deleteTodolistAT | createTodolistAT | createTaskAT
    | deleteTaskAT | changeTaskStatusAT | deleteAllTasksAT | changeTaskTitleAT ;

export const tasksReducer = (state: TasksState, action: TasksActionType): TasksState => {
    switch (action.type) {
        case "create_task": {
            const {todolistId, title} = action.payload
            const stateCopy = {...state}
            const tasks = stateCopy[todolistId]
            const newTasks = [{id: v1(), title, isDone: false}, ...tasks]
            return {...stateCopy, [todolistId]: newTasks}
        }
        case "delete_task": {
            const {taskId, todolistId} = action.payload
            const nextState: TasksState = {...state}
            return {...nextState, [todolistId]: nextState[todolistId].filter(task => task.id !== taskId)}
        }
        case "change_task_status": {
            const {todolistId, taskId, isDone} = action.payload
            const stateCopy = {...state}
            return {...stateCopy,
                [todolistId]: stateCopy[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)}}
            case "delete_all_tasks": {
                const {todolistId} = action.payload
                const stateCopy = {...state}
                return {...stateCopy, [todolistId]: []}
            }
        case "create_todolist": {
            return {...state, [action.payload.id]: []}
        }
        case "change_task_title": {
            const {todolistId, taskId, title} = action.payload
            const stateCopy = {...state}
            return {...stateCopy,
                [todolistId]: stateCopy[todolistId].map(task => task.id === taskId ? {...task, title}: task)}
        }
        case "delete_todolist": {
            const {id} = action.payload
            const stateCopy = {...state}
            delete stateCopy[id]
            return stateCopy
        }
        default:
            throw new Error(`Unknown action type `)
    }
}


export const createTaskAC = (todolistId:string, title: string) => {
    return {
        type: "create_task",
        payload: { todolistId, title }
    } as const
}

export const deleteTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "delete_task",
        payload: { taskId, todolistId }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "change_task_status",
        payload: {todolistId, taskId, isDone}
    } as const
}

export const deleteAllTasksAC = (todolistId: string) => {
    return {
        type: "delete_all_tasks",
        payload: {todolistId}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "change_task_title",
        payload: {todolistId, taskId, title}
    } as const
}