import './App.css'
import {TodolistItem} from './components/TodolistItem/TodolistItem.tsx'
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ])


    const deleteTask = (id: number) => {
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

    return (
        <div className="app">
            <TodolistItem
                title="What to learn"
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}
