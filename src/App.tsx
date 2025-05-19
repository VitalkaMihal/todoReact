import './App.css'
import {TodolistItem} from './components/TodolistItem/TodolistItem.tsx'
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoList = {
    id: string;
    title: string;
    filter: FilterValues;
}

export const App = () => {

    const [todoLists, setTodoLists] = useState<TodoList[]>([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task: Task) => task.id !== id))
    }

    const changeFilter = ( todolistId: string, filter: FilterValues) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todolistId ? {...todoList, filter} : todoList))
        console.log(filter)
    }

    const createTaskHandler = (title: string) => {
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }

    const deleteAll = () => {
        setTasks([])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
        setTasks(newState)
    }

    return (
        <div className="app">
            {todoLists.map(todolist => {
                let filteredTasks = tasks
                if (todolist.filter === 'active') {
                    filteredTasks = tasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks.filter(task => task.isDone)
                }
                return (
                    <TodolistItem key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTaskHandler}
                        deleteAll={deleteAll}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}

        </div>
    )
}
