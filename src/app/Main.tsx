import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAddTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ p: "20px 0" }}>
        <CreateItemForm onCreateItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
