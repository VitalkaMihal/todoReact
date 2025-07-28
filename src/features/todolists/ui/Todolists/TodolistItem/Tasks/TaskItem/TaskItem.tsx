import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Todolistitems.styles.ts";
import {Box, Checkbox} from "@mui/material";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Task} from "@/app/App.tsx";

type Props = {
    todolistId: string
    task: Task
}

export const TaskItem = ({todolistId, task}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId,
            taskId: task.id,
            isDone: e.currentTarget.checked
        }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    return (
        <ListItem  disablePadding
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
}