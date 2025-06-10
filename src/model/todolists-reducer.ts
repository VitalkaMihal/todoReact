import {TodoList} from "../App.tsx";
import {v1} from "uuid";

const initialState: TodoList[] = []

type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
type createTodolistAT = ReturnType<typeof createTodolistAC>
type ActionType = deleteTodolistAT | createTodolistAT

export const todolistsReducer = (todolists: TodoList[] = initialState,
                                 action: ActionType) => {
    switch (action.type) {
        case "delete_todolist":
            const {id} = action.payload
            return todolists.filter(todoList => todoList.id !== id)
        case "create_todolist":
            const {title} = action.payload
            const newTodo: TodoList = {id: v1(), title, filter: "all"}
            return [...todolists, newTodo]

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
        payload: { title }
    } as const
}