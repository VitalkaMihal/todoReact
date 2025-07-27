import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/components/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {FilterValues} from "@/app/App.tsx";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "@/model/tasks-reducer.ts";


export const Todolists = () => {
    const todoLists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }


    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
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

    return (<>
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
        </>
    );
};
