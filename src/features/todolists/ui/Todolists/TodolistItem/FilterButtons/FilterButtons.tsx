import { Box, Button } from "@mui/material"
import { containerSx } from "@/common/styles/container.styles.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { DomainTodolist, FilterValues } from "@/features/todolists/model/todolists-slice.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "contained"}
        size="small"
        color={filter === "all" ? "inherit" : "primary"}
        onClick={() => changeFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "contained"}
        size="small"
        color={filter === "active" ? "inherit" : "primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "contained"}
        size="small"
        color={filter === "completed" ? "inherit" : "secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
