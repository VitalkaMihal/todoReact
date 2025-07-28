import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";
import {TodoList} from "@/features/todolists/model/todolists-reducer.ts";

type Props = {
    todolist: TodoList
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
    const tasks = useAppSelector(selectTasks)

    const todolistTask = tasks[id]
    let filteredTasks = todolistTask
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        return (
                            <TaskItem task={task} todolistId={id} key={task.id}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}