import {FilterValues, TodoList} from "../../app/App.tsx";
import {ButtonComponent} from "../Button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import BackspaceIcon from '@mui/icons-material/Backspace';
import {Box, Button, Checkbox} from "@mui/material";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {containerSx, getListItemSx} from "./Todolistitems.styles.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";


type Props = {
   todolist: TodoList
}


export const TodolistItem = ({todolist}: Props) => {
    const tasks = useAppSelector(selectTasks)
    const {id, filter} = todolist
    const dispatch = useAppDispatch()

        const todolistTask = tasks[id]
        let filteredTasks = todolistTask
        if (filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    const deleteAllHandler = () => {
        dispatch(deleteAllTasksAC({todolistId: id}))
    }



    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC(id, title))
    }


    return (
        <div>
       <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <ButtonComponent title={'delete all'} onClickHandler={deleteAllHandler}/>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        const deleteTaskHandler = () => {
                            dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: e.currentTarget.checked}))
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC({todolistId: id, taskId:task.id, title}))
                        }

                        return (
                            <ListItem key={task.id} disablePadding
                                      sx={getListItemSx(task.isDone)}
                                      className={task.isDone ? 'is-done' : ''}>
                                <Box>
                                    <Checkbox size="small" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </Box>
                                <IconButton onClick={deleteTaskHandler}>
                                    <BackspaceIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
                <Box sx={containerSx}>
                    <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                            size="small"
                            color={filter === 'all' ? 'inherit' : 'primary'}
                            onClick={() => changeFilterHandler('all')}>
                        All
                    </Button>
                    <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                            size="small"
                            color={filter === 'active' ? 'inherit' : 'primary'}
                            onClick={() => changeFilterHandler('active')}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                            size="small"
                            color={filter === 'completed' ? 'inherit' : 'secondary'}
                            onClick={() => changeFilterHandler('completed')}>
                        Completed
                    </Button>
                </Box>
        </div>
    )
}