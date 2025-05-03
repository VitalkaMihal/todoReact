import {FilterValues, Task} from "../../App.tsx";
import {Button} from "../Button/Button.tsx";

type TodolistPropsType = {
    title: string;
    tasks: Task[];
    deleteTask: (taskId: number) => void;
    changeFilter: (filterValues: FilterValues) => void;
}


export const TodolistItem = ({ title, tasks, deleteTask, changeFilter }: TodolistPropsType) => {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'} />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <Button title={"x"} onClickHandler={() => {deleteTask(task.id)}} />
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