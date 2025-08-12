import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { createTodolistAC } from "@/features/todolists/model/todolists-reducer.ts"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ p: "20px 0" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
