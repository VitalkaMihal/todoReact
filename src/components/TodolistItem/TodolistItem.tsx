import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string;
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    changeFilter: (filterValues: FilterValues) => void;
    createTask: (title: string) => void;
}


export const TodolistItem = ({ title, tasks, deleteTask, changeFilter, createTask }: TodolistPropsType) => {

    const [tasksTitle, setTasksTitle] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTasksTitle(event.target.value)
    }

    const createTaskHandler = () => {
        createTask(tasksTitle)
        setTasksTitle("")
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement> ) => { if (event.key === 'Enter') {
        createTaskHandler()
    }}



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={tasksTitle} onChange={onChangeHandler}  onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClickHandler={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {deleteTask(task.id)}
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={"x"} onClickHandler={deleteTaskHandler} />
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}  onClickHandler={() => {changeFilter("all")}}/>
                <Button title={'Active'}  onClickHandler={() => {changeFilter("active")}}/>
                <Button title={'Completed'}  onClickHandler={() => {changeFilter("completed")}}/>
            </div>
        </div>
    )
}