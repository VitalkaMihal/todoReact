import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useEffect, useState } from "react"
import { todolistsApi } from "../../api/todolistsApi"
import { Todolist } from "@/common/instance/todolistsApi.types.ts"

export const Todolists = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])

  useEffect(() => {
    // Получаем список тудулистов
    todolistsApi.getTodolists().then((res) => {
      const todo = res.data.map((it) => {
        return { ...it, filter: "all" }
      })
      setTodolists(todo)
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
