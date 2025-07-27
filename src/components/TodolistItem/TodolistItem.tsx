import {TodoList} from "../../app/App.tsx";
import {ButtonComponent} from "../Button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import BackspaceIcon from '@mui/icons-material/Backspace';
import {Box, Checkbox} from "@mui/material";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from "./Todolistitems.styles.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";


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
              <FilterButtons todolist={todolist} />
        </div>
    )
}