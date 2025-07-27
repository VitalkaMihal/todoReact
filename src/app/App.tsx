import './App.css'
import {TodolistItem} from '../components/TodolistItem/TodolistItem.tsx'
import {CreateItemForm} from "../components/CreateItemForm/CreateItemForm.tsx";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {Header} from "@/Header.tsx";
import {selectThemeMode} from "@/model/app-selectors.ts";
import {getTheme} from "@/common/theme/theme.ts";

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
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
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


    const deleteTask = (todolistId: string, taskId: string ) => {
        dispatch(deleteTaskAC({ todolistId, taskId }))
    }

    const createTaskHandler = (todolistId: string, title: string) => {
        dispatch(createTaskAC(todolistId, title))
    }

    const deleteAll = (todolistId: string) => {
        dispatch(deleteAllTasksAC({todolistId}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
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
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline />
                    <Header />
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
