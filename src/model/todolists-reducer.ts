import {TodoList} from "../App.tsx";
import {v1} from "uuid";

const initialState: TodoList[] = []

type deleteTodolistAT = ReturnType<typeof deleteTodolistAC>
type createTodolistAT = ReturnType<typeof createTodolistAC>

export const todolistsReducer = (todolists: TodoList[] = initialState,
                                 action: deleteTodolistAT | createTodolistAT) => {
    switch (action.type) {
        case "delete_todolist":
            return todolists.filter(todoList => todoList.id !== action.payload.id)
        case "create_todolist":
            const newTodo: TodoList = {
                id: v1(),
                title: action.payload.title,
                filter: "all"
            }
            return [...todolists, newTodo]

        default:
            return todolists;
    }
}

export const deleteTodolistAC = (id: string) => {
    return {
        type: "delete_todolist",
        payload: {
            id: id
        }
    } as const
}

export const createTodolistAC = (title: string) => {
    return {
        type: "create_todolist",
        payload: {
            title: title
        }
    } as const
}