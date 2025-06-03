import {FilterValues, Task} from "../../App.tsx";
import {ButtonComponent} from "../Button/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Button, Checkbox} from "@mui/material";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

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
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: TodolistPropsType) => {

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteAllHandler = () => {
        deleteAll(id)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler} >
                    <DeleteIcon />
                </IconButton >
                {/*<ButtonComponent title={'x'} onClickHandler={deleteTodolistHandler}/>*/}
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <ButtonComponent title={'dalete all'} onClickHandler={deleteAllHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, e.currentTarget.checked)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                                {/*<input type="checkbox" checked={task.isDone}*/}
                                {/*       onChange={changeTaskStatusHandler}/>*/}
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                                {/*<ButtonComponent title={"x"} onClickHandler={deleteTaskHandler}/>*/}
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>

                {/*<ButtonComponent title={'All'}*/}
                {/*        className={filter === 'all' ? 'active-filter' : ''}*/}
                {/*        onClickHandler={() => changeFilterHandler("all")}/>*/}
                {/*<ButtonComponent title={'Active'}*/}
                {/*        className={filter === 'active' ? 'active-filter' : ''}*/}
                {/*        onClickHandler={() => changeFilterHandler("active")*/}
                {/*        }/>*/}
                {/*<ButtonComponent title={'Completed'}*/}
                {/*        className={filter === 'completed' ? 'active-filter' : ''}*/}
                {/*        onClickHandler={() => changeFilterHandler("completed")*/}
                {/*        }/>*/}
            </div>
        </div>
    )
}