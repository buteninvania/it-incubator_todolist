//The task should be added to the list (addTask)
//The task must be removed from the list (removeTask)
//The task state needs to be changed (changeIsDoneTask)
//The title of the problem should be changed (changeTaskTitle)

import { v1 } from "uuid"
import { TaskStateType } from "../App"
import {addTaskAC, changeIsDoneTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer } from "./task-reducer"

let initialState: TaskStateType

let toDoListId_01 = v1()
let toDoListId_02 = v1()

beforeEach(() => {
    initialState = {
        [toDoListId_01]: [
            {id: v1(), title: 'Check mail 0 ;)', isDone: false},
            {id: v1(), title: 'Check mail 1 ;)', isDone: true},
            {id: v1(), title: 'Check mail 2 ;)', isDone: false},
        ],
        [toDoListId_02]: [
            {id: v1(), title: 'Check mail 0 ;)', isDone: true},
            {id: v1(), title: 'Check mail 1 ;)', isDone: false},
            {id: v1(), title: 'Check mail 2 ;)', isDone: true},
        ],
    }
})

test('The task should be added to the list (addTask)', () => {

    const newState = taskReducer(initialState, addTaskAC('write tests', toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(4)
    expect(newState[toDoListId_01][0].title).toBe('write tests')
    expect(newState[toDoListId_01][0].isDone).toBe(false)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task must be removed from the list (removeTask))', () => {

    const newState = taskReducer(initialState, removeTaskAC(initialState[toDoListId_01][0].id, toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(2)
    expect(newState[toDoListId_01][0].title).toBe('Check mail 1 ;)')
    expect(newState[toDoListId_01][0].isDone).toBe(true)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task state needs to be changed (changeIsDoneTask)', () => {

    const newState = taskReducer(initialState, changeIsDoneTaskAC(initialState[toDoListId_01][0].id, toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Check mail 0 ;)')
    expect(newState[toDoListId_01][0].isDone).toBe(true)
    expect(newState[toDoListId_01][1].isDone).toBe(true)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The title of the problem should be changed (changeTaskTitle)', () => {

    const newState = taskReducer(initialState, changeTaskTitleAC(initialState[toDoListId_01][0].id, toDoListId_01, 'Hello!)'))

    expect(newState).not.toBe(initialState)
    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Hello!)')
    expect(newState[toDoListId_01][1].title).toBe('Check mail 1 ;)')
    expect(newState[toDoListId_01][0].isDone).toBe(false)
    expect(newState[toDoListId_02].length).toBe(3)
})


