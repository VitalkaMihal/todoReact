import './App.css'
import {TodolistItem} from './components/TodolistItem/TodolistItem.tsx'
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/CreateItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "./components/TodolistItem/Todolistitems.styles.ts";
import {NavButton} from "./components/Button/NavButton.ts";

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

export type TasksState = {
    [key: string]: Task[]
}

export const App = () => {

    const todoList1 = v1();
    const todoList2 = v1();

    const [todoLists, setTodoLists] = useState<TodoList[]>([
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ]
    })

    const deleteTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todolistId ? {...todoList, filter} : todoList))
    }

    const createTaskHandler = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteAll = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todolistId))
        delete tasks[todolistId]
    }

    const setTodoFilteredTask = (todolistId: string, filter: FilterValues) => {
        let filteredTasks = tasks[todolistId]
        if (filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }
        return filteredTasks
    }

    const createTodolist = (title: string) => {
        const TodoListId = v1()
        const newTodolist: TodoList = {id: TodoListId, title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [TodoListId]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }

    return (
        <div className="app">
            <AppBar position="static" sx={{ mb: '30px' }} >
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={'dodgerblue'}>Faq</NavButton>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ p: '20px 0' }}>
                    <CreateItemForm onCreateItem={createTodolist} />
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map(todoList => {
                        return (
                            <Grid key={todoList.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                <TodolistItem key={todoList.id}
                                              id={todoList.id}
                                              title={todoList.title}
                                              filter={todoList.filter}
                                              tasks={setTodoFilteredTask(todoList.id, todoList.filter)}
                                              deleteTask={deleteTask}
                                              changeFilter={changeFilter}
                                              createTask={createTaskHandler}
                                              deleteAll={deleteAll}
                                              changeTaskStatus={changeTaskStatus}
                                              deleteTodolist={deleteTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    )
}
