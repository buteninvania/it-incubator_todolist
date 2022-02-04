import {v1} from 'uuid'
import {TaskPrioritys, TaskStatuses} from '../../api/todolist-api'
import {addTodoListAC} from '../todolist-reducer/todolist-reducer'
import {addTaskAC, changeIsDoneTaskAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './task-reducer'
import {TaskStateType} from './task-reducer.types'

let initialState: TaskStateType

let toDoListId_01 = v1()
let toDoListId_02 = v1()

beforeEach(() => {
    initialState = {
        [toDoListId_01]: [
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
        ],
        [toDoListId_02]: [
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
        ],
    }
})

test('The task should be added to the list (addTask)', () => {

    const newState = taskReducer(initialState, addTaskAC('write tests', toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(4)
    expect(newState[toDoListId_01][0].title).toBe('write tests')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task must be removed from the list (removeTask))', () => {

    const newState = taskReducer(initialState, removeTaskAC(initialState[toDoListId_01][0].id, toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(2)
    expect(newState[toDoListId_01][0].title).toBe('Check mail 1 ;)')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task state needs to be changed (changeIsDoneTask)', () => {

    const newState = taskReducer(initialState, changeIsDoneTaskAC(initialState[toDoListId_01][0].id, toDoListId_01, TaskStatuses.Completed))

    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Check mail 0 ;)')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_01][1].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_02][0].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The title of the problem should be changed (changeTaskTitle)', () => {

    const newState = taskReducer(initialState, changeTaskTitleAC(initialState[toDoListId_01][0].id, toDoListId_01, 'Hello!)'))

    expect(newState).not.toBe(initialState)
    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Hello!)')
    expect(newState[toDoListId_01][1].title).toBe('Check mail 1 ;)')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('When adding a new list of tasks, a new array with tasks should be created in the task state (addTodoListAC)', () => {

    const newState = taskReducer(initialState, addTodoListAC('new todolist'))

    const keys = Object.keys(newState)
    const newKey = keys.find(k => k !== toDoListId_01 && k !== toDoListId_02)
    if (!newKey) {
        throw Error('no key')
    }

    expect(keys.length).toBe(3)
    expect(newState[newKey]).toEqual([])

})


