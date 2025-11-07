import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { TodoList } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect, useState } from "react"
import { DomainTask } from "@/common/instance/tasksApi.types.ts"
import { tasksApi } from "@/common/instance/tasksApi.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  todolist: TodoList
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    tasksApi.getTasks(id).then((res) => setTasks({ [id]: res.data.items }))
  }, [])

  const todolistTask = tasks[id]
  let filteredTasks = todolistTask
  if (filter === "active") {
    filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed)
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
