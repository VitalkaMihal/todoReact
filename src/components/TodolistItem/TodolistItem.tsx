import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string;
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    changeFilter: (filterValues: FilterValues) => void;
    createTask: (title: string) => void;
    deleteAll: () => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
}


export const TodolistItem = ({ title, tasks, deleteTask, changeFilter, createTask, deleteAll, changeTaskStatus }: TodolistPropsType) => {

    const [tasksTitle, setTasksTitle] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTasksTitle(event.target.value)
    }

    const createTaskHandler = () => {
        const trimmedTitle = tasksTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTasksTitle('')
        }
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement> ) => { if (event.key === 'Enter') {
        createTaskHandler()
    }}

    const changeTaskStatusHandler = (task: string, e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task, newStatusValue)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={tasksTitle} onChange={onChangeHandler}  onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClickHandler={createTaskHandler}/>
            </div>
            <Button title={'dalete all'} onClickHandler={deleteAll}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {deleteTask(task.id)}
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e)}/>
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