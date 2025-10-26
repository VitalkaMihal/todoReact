import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"
import { useEffect, useState } from "react"
import { todolistsApi } from "../../api/todolistsApi"
import { DomainTask } from "@/common/instance/tasksApi.types.ts"
import { Todolist } from "@/common/instance/todolistsApi.types.ts"
import { tasksApi } from "@/common/instance/tasksApi.ts"

export const Todolists = () => {
  const todoLists = useAppSelector(selectTodolists)

  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    // Получаем список тудулистов
    todolistsApi.getTodolists().then((res) => {
      setTodolists(res.data)

      // Для хранения промисов получения задач
      const promises = res.data.map((todolist) =>
        tasksApi.getTasks(todolist.id).then((res) => ({
          [todolist.id]: res.data.items,
        })),
      )
      // После завершения всех запросов обновляем состояние задач
      Promise.all(promises).then((results) => {
        const tasksMap: Record<string, DomainTask[]> = {}
        results.forEach((result) => {
          const key = Object.keys(result)[0]
          tasksMap[key] = result[key]
        })
        setTasks(tasksMap)
      })
    })
  }, [])

  return (
    <>
      {todolists.map((todoList) => (
        <Grid key={todoList.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todoList} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
