import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()
  const { id, entityStatus } = todolist

  const createTaskHandler = (title: string) => {
    createTask({ todolistId: id, title })
  }

  return (
    <div inert={entityStatus === "loading"}>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
