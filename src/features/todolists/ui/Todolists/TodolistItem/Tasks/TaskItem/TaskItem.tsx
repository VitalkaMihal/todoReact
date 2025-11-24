import { Box, Checkbox } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import BackspaceIcon from "@mui/icons-material/Backspace"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolistId: string
  task: DomainTask
}

export const TaskItem = ({ todolistId, task }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const isTaskCompleted = task.status === TaskStatus.Completed

  const deleteTaskHandler = () => {
    deleteTask({ todolistId, taskId: task.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ ...task, status })
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ ...task, title })
  }

  return (
    <ListItem disablePadding sx={getListItemSx(isTaskCompleted)} className={isTaskCompleted ? "is-done" : ""}>
      <Box>
        <Checkbox size="small" checked={isTaskCompleted} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </Box>
      <IconButton onClick={deleteTaskHandler}>
        <BackspaceIcon />
      </IconButton>
    </ListItem>
  )
}
