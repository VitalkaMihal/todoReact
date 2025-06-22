import {FilterValues, TodoList} from "../app/App.tsx";
import {v1} from "uuid";

const initialState: TodoList[] = []

export type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type createTodolistAT = ReturnType<typeof createTodolistAC>
type changeTodolistTitleAT =  ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterAT =  ReturnType<typeof changeTodolistFilterAC>
type ActionType = deleteTodolistAT | createTodolistAT | changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer =
    (todolists: TodoList[] = initialState, action: ActionType): TodoList[] => {
        switch (action.type) {
            case "delete_todolist": {
                const { id } = action.payload
                return todolists.filter(tl => tl.id !== id)
            }
            case "create_todolist": {
                const { id, title } = action.payload
                const newTodo: TodoList = { id: id, title: title, filter: "all" }
                return [...todolists, newTodo]
            }
            case "change_todolist_title": {
                const { id, title } = action.payload
                return todolists.map(tl => tl.id === id ? { ...tl, title: title } : tl)
            }
            case "change_todolist_filter":
                const { id, filter  } = action.payload
                return todolists.map(tl => tl.id === id ? { ...tl, filter: filter } : tl)
            default:
                return todolists;
        }
    }


export const deleteTodolistAC = (id: string) => {
    return {
        type: "delete_todolist",
        payload: { id }
    } as const
}

export const createTodolistAC = (title: string) => {
    return {
        type: "create_todolist",
        payload: { id: v1(), title }
    } as const
}

export const changeTodolistTitleAC = ({id, title}: {id: string, title: string}) => {
    return {
        type: "change_todolist_title",
        payload: { id, title }
    } as const
}

export const changeTodolistFilterAC = ({id, filter}: {id: string, filter: FilterValues}) => {
    return {
        type: "change_todolist_filter",
        payload: { id, filter }
    } as const
}

