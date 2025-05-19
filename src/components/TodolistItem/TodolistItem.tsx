import {FilterValues, Task, TodoList} from "../../App.tsx";
import {Button} from "../Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    todolist: TodoList;
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    changeFilter: (filterValues: FilterValues) => void;
    createTask: (title: string) => void;
    deleteAll: () => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
}


export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 deleteAll,
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
            createTask(trimmedTitle)
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




    return (
        <div>
            <h3>{todolist.title}</h3>
            <div>
                <input value={tasksTitle}
                       onChange={onChangeHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       className={error ? 'error' : ''}
                />
                <Button title={'+'} onClickHandler={createTaskHandler}/>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <Button title={'dalete all'} onClickHandler={deleteAll}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement> ) => {
                            changeTaskStatus(task.id, e.currentTarget.checked)
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
                        className={todolist.filter === 'all' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilter("all")}/>
                <Button title={'Active'}
                        className={todolist.filter === 'active' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilter("active")
                }/>
                <Button title={'Completed'}
                        className={todolist.filter === 'completed' ? 'active-filter' : ''}
                        onClickHandler={() => changeFilter("completed")
                }/>
            </div>
        </div>
    )
}