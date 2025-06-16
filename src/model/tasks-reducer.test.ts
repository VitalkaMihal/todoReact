import { beforeEach, expect, test } from 'vitest'
import {TasksState} from "../App.tsx";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createNewTasksAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC, removeTasksFromTodolistAC,
    tasksReducer
} from './tasks-reducer.ts';


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

test('correct task should change its status', () => {
    const endState = tasksReducer(startState,
        changeTaskStatusAC('todoList2','3', true))

    expect(endState['todoList2'][2].isDone).toBeTruthy()
    expect(endState['todoList1'][2].isDone).toBeFalsy()
})

test('all tasks should be deleted to correct array', () => {
    const endState = tasksReducer(startState,
        deleteAllTasksAC('todoList2'))

    expect(endState['todoList2'].length).toBe(0)
    expect(endState['todoList1'].length).toBe(3)
})

test('correct task should change its title', () => {
    const endState = tasksReducer(startState,
        changeTaskTitleAC('todoList2', '2', 'coffee'))

    expect(endState['todoList2'][1].title).toBe('coffee')
    expect(endState['todoList1'][1].title).toBe('JS')
})

test('new property with new array should be added when new todolist added', () => {
  const endState = tasksReducer(startState, createNewTasksAC('todoList3'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoList1' && k != 'todoList2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('correct tasks should be deletes when todolist deleted', () => {
    const endState = tasksReducer(startState, removeTasksFromTodolistAC('todoList2'))

    expect(Object.keys(endState).length).toBe(1)
    expect(endState['todoList1']).toBeDefined()
    expect(endState['todoList2']).toBeUndefined()
})

