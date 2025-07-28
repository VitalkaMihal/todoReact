import { beforeEach, expect, test } from 'vitest'
import {TasksState} from "@/app/App.tsx";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC,
    tasksReducer
} from '../tasks-reducer.ts';
import {createTodolistAC, deleteTodolistAC} from "../todolists-reducer.ts";


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
    const endState = tasksReducer(startState, deleteTaskAC({taskId: '2', todolistId: 'todoList2'}))

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

test('correct task should change its status', () => {
    const endState = tasksReducer(startState,
        changeTaskStatusAC({todolistId: 'todoList2',taskId: '3', isDone: true}))

    expect(endState['todoList2'][2].isDone).toBeTruthy()
    expect(endState['todoList1'][2].isDone).toBeFalsy()
})

test('all tasks should be deleted to correct array', () => {
    const endState = tasksReducer(startState,
        deleteAllTasksAC({ todolistId: 'todoList2'}))

    expect(endState['todoList2'].length).toBe(0)
    expect(endState['todoList1'].length).toBe(3)
})

test('correct task should change its title', () => {
    const endState = tasksReducer(startState,
        changeTaskTitleAC({todolistId: 'todoList2', taskId: '2', title: 'coffee'}))

    expect(endState['todoList2'][1].title).toBe('coffee')
    expect(endState['todoList1'][1].title).toBe('JS')
})

test('new property with new array should be added when new todolist added', () => {
  const endState = tasksReducer(startState, createTodolistAC('todoList3'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoList1' && k != 'todoList2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('correct tasks should be deletes when todolist deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({id: 'todoList2'}))

    expect(Object.keys(endState).length).toBe(1)
    expect(endState['todoList1']).toBeDefined()
    expect(endState['todoList2']).toBeUndefined()
})

