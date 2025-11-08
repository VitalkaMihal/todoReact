import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useEffect } from "react"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
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
