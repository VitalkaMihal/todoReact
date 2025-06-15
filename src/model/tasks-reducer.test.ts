import { beforeEach, expect, test } from 'vitest'
import {TasksState} from "../App.tsx";
import {createTaskAC, deleteTaskAC, tasksReducer} from './tasks-reducer.ts';
// import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todoList1: [
            {id: "1", title: 'HTML&CSS', isDone: true},
            {id: "2", title: 'JS', isDone: true},
            {id: "3", title: 'ReactJS', isDone: false},
        ],
        todoList2: [
            {id: "1", title: 'bread', isDone: true},
            {id: "2", title: 'milk', isDone: true},
            {id: "3", title: 'tea', isDone: false},
        ]
    }
})

test('correct task should be deleted', () => {
    const endState = tasksReducer(startState, deleteTaskAC('2','todoList2'))

    expect(endState['todoList1'].length).toBe(3)
    expect(endState['todoList2'].length).toBe(2)
    expect(endState['todoList2'].every(t => t.id !== "2")).toBeTruthy()
    expect(endState['todoList2'][0].id).toBe("1")
    expect(endState['todoList2'][1].id).toBe("3")

})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC('todoList2', 'sugar' )
    )

    expect(endState['todoList2']?.length).toBe(4)
    expect(endState['todoList1']?.length).toBe(3)
    expect(endState['todoList2'][0].id).toBeDefined()
    expect(endState['todoList2'][0].title).toBe('sugar')
    expect(endState['todoList2'][0].isDone).toBe(false)
})