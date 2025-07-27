import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/components/TodolistItem/Todolistitems.styles.ts";
import {Box, Checkbox} from "@mui/material";
import {EditableSpan} from "@/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodoList} from "@/app/App.tsx";

type Props = {
    todolist: TodoList
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()


    const todolistTask = tasks[id]
    let filteredTasks = todolistTask
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        const deleteTaskHandler = () => {
                            dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC({
                                todolistId: id,
                                taskId: task.id,
                                isDone: e.currentTarget.checked
                            }))
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                        }

                        return (
                            <ListItem key={task.id} disablePadding
                                      sx={getListItemSx(task.isDone)}
                                      className={task.isDone ? 'is-done' : ''}>
                                <Box>
                                    <Checkbox size="small" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </Box>
                                <IconButton onClick={deleteTaskHandler}>
                                    <BackspaceIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
        </>
    )
}