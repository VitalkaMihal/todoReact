import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id } = todolist
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({ todolistId: id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
