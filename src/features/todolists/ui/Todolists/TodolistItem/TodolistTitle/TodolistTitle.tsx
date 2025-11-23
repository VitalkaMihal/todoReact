import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeTodolistTitleTC, DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import styles from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation } from "@/features/todolists/api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    removeTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <HighlightOffIcon />
      </IconButton>
    </div>
  )
}
