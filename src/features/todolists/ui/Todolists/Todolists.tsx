import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { Box } from "@mui/material"
import { containerSx } from "@/common/styles/container.styles.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todoList) => (
        <Grid key={todoList.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todoList} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
