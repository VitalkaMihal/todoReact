import './App.css'
import {TodolistItem} from './components/TodolistItem/TodolistItem.tsx'
import {useReducer, useState} from "react";
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
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createNewTasksAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

type ThemeMode = 'dark' | 'light'

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

    const initialState: TodoList[] = [
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "all"}
    ]

    const [todoLists, dispatchTodolist] = useReducer(todolistsReducer, initialState)

    const initialTasks: TasksState = {
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
    }

    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks)

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolist(action)
        delete tasks[action.payload.id]
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchTodolist(action)
        dispatchTasks(createNewTasksAC(action.payload.id))
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        dispatchTodolist(changeTodolistFilterAC({id, filter}))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatchTodolist(changeTodolistTitleAC({id, title}))
    }


    const deleteTask = (taskId: string, todoListId: string) => {
        dispatchTasks(deleteTaskAC(taskId, todoListId))
    }

    const createTaskHandler = (todolistId: string, title: string) => {
        dispatchTasks(createTaskAC(todolistId, title))
    }

    const deleteAll = (todolistId: string) => {
        dispatchTasks(deleteAllTasksAC(todolistId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
      dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
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

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
       dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
    }


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline />
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{p: '20px 0'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map(todoList => {
                            return (
                                <Grid key={todoList.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
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
        </ThemeProvider>
    )
}
