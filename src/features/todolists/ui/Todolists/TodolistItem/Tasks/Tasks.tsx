import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data } = useGetTasksQuery(id)

  const todolistTask = data?.items
  let filteredTasks = todolistTask
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <TaskItem task={task} todolistId={id} key={task.id} />
          })}
        </List>
      )}
    </>
  )
}
