import {TodoList} from "../../app/App.tsx";
import {ButtonComponent} from "../Button/Button.tsx";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {createTaskAC, deleteAllTasksAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";
import {Tasks} from "@/Tasks.tsx";

type Props = {
    todolist: TodoList
}

export const TodolistItem = ({todolist}: Props) => {
    const {id} = todolist
    const dispatch = useAppDispatch()

    const deleteAllHandler = () => {
        dispatch(deleteAllTasksAC({todolistId: id}))
    }

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC(id, title))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <ButtonComponent title={'delete all'} onClickHandler={deleteAllHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}