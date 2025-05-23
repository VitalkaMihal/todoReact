import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    id: string;
    title: string
    tasks: Task[];
    filter: FilterValues;
    deleteTask: (todoListId: string, taskId: string) => void;
    changeFilter: (todolistId: string, filter: FilterValues) => void;
    createTask: (todolistId: string, title: string) => void;
    deleteAll: (todolistId: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    deleteTodolist: (todolistId: string) => void
}


export const TodolistItem = ({
                                 id,
                                 title,
                                 filter,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 deleteAll,
                                 deleteTodolist,
                                 changeTaskStatus,
                             }: TodolistPropsType) => {

    const [tasksTitle, setTasksTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTasksTitle(event.target.value)
        setError(null)
    }

    const createTaskHandler = () => {
        const trimmedTitle = tasksTitle.trim()
        if (trimmedTitle !== '') {
            createTask(id, trimmedTitle)
            setTasksTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteAllHendler = () => {
        deleteAll(id)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClickHandler={deleteTodolistHandler} />
            </div>
            <div>
                <input value={tasksTitle}
                       onChange={onChangeHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       className={error ? 'error' : ''}
                />
                <Button title={'+'} onClickHandler={createTaskHandler}/>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <Button title={'dalete all'} onClickHandler={deleteAllHendler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={"x"} onClickHandler={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilterHandler("all")}/>
                <Button title={'Active'}
                        className={filter === 'active' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilterHandler("active")
                        }/>
                <Button title={'Completed'}
                        className={filter === 'completed' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilterHandler("completed")
                        }/>
            </div>
        </div>
    )
}