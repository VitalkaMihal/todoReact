import { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanProps = {
  value: string
  onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {/*{isEditMode ? (*/}
      {/*    <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus />*/}
      {/*) : (*/}
      {/*    <span onDoubleClick={turnOnEditMode}>{value}</span>*/}
      {/*)}*/}
      {isEditMode ? (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={changeTitle}
          onBlur={turnOffEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
