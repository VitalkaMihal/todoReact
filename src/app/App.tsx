import './App.css'
import {TodolistItem} from '../components/TodolistItem/TodolistItem.tsx'
import { useState} from "react";
import {CreateItemForm} from "../components/CreateItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "../components/TodolistItem/Todolistitems.styles.ts";
import {NavButton} from "../components/Button/NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC, changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

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

    const todoLists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }


    const deleteTask = (taskId: string, todoListId: string) => {
        dispatch(deleteTaskAC(taskId, todoListId))
    }

    const createTaskHandler = (todolistId: string, title: string) => {
        dispatch(createTaskAC(todolistId, title))
    }

    const deleteAll = (todolistId: string) => {
        dispatch(deleteAllTasksAC(todolistId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
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
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
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
