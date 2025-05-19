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

    const [todolists, setTodolists] = useState<TodoList[]>([
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

    const [filter, setFilter] = useState<FilterValues>("all")

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }


    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
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
            {todolists.map(todolist => {
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
