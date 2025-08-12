import { ButtonComponent } from "@/features/todolists/ui/Todolists/TodolistItem/ButtonComponent/ButtonComponent.tsx"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { createTaskAC, deleteAllTasksAC } from "@/features/todolists/model/tasks-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { TodoList } from "@/features/todolists/model/todolists-reducer"

type Props = {
  todolist: TodoList
}

export const TodolistItem = ({ todolist }: Props) => {
  const { id } = todolist
  const dispatch = useAppDispatch()

  const deleteAllHandler = () => {
    dispatch(deleteAllTasksAC({ todolistId: id }))
  }

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC(id, title))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} />
      <ButtonComponent title={"delete all"} onClickHandler={deleteAllHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
