import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton'
import {EditableSpan} from "@/components/EditableSpan/EditableSpan.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {TodoList} from "@/app/App.tsx";

type Props = {
    todolist: TodoList
}


export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler} >
                <HighlightOffIcon />
            </IconButton >
        </div>
    );
};
