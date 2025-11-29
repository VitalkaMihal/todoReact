import { Todolist } from "../api/todolistsApi.types"
import { createAppSlice } from "@/common/utils"
import { RequestStatus } from "@/common/types"
import { clearDataAC } from "@/common/actions/actions.ts"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => builder.addCase(clearDataAC.type, () => []),
  reducers: (create) => ({
    changeTodolistStatusAC: create.reducer<{ id: string; status: RequestStatus }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.status
      }
    }),
  }),
})

export const { changeTodolistStatusAC } = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors

export const todolistsReducer = todolistsSlice.reducer
