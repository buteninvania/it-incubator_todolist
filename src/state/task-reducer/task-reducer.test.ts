import {v1} from 'uuid'
import {TaskPrioritys, TaskStatuses} from '../../api/todolist-api'
import {addTodoListAC, setTodolistsAC} from '../todolist-reducer/todolist-reducer'
import {addTaskAC, removeTaskAC, setTasksAC, taskReducer, updateTaskAC} from './task-reducer'
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

    const newTask = {
        id: v1(), title: 'Learn javascript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
    }

    const newState = taskReducer(initialState, addTaskAC(toDoListId_01, {
        id: v1(), title: 'Learn javascript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
    }))

    expect(newState[toDoListId_01].length).toBe(4)
    expect(newState[toDoListId_01][0].title).toBe('Learn javascript')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task must be removed from the list (removeTask))', () => {

    const newState = taskReducer(initialState, removeTaskAC(initialState[toDoListId_01][0].id, toDoListId_01))

    expect(newState[toDoListId_01].length).toBe(2)
    expect(newState[toDoListId_01][0].title).toBe('Learn typescript')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The task state needs to be changed (changeIsDoneTask)', () => {

    const newState = taskReducer(initialState, updateTaskAC(initialState[toDoListId_01][0].id, toDoListId_01, {status: TaskStatuses.Completed}))

    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Learn typescript')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.Completed)
    expect(newState[toDoListId_01][1].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02][0].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('The title of the problem should be changed (changeTaskTitle)', () => {

    const newState = taskReducer(initialState, updateTaskAC(initialState[toDoListId_01][0].id, toDoListId_01, {title: 'Hello!)'}))

    expect(newState).not.toBe(initialState)
    expect(newState[toDoListId_01].length).toBe(3)
    expect(newState[toDoListId_01][0].title).toBe('Hello!)')
    expect(newState[toDoListId_01][1].title).toBe('Learn typescript')
    expect(newState[toDoListId_01][0].status).toBe(TaskStatuses.InProgress)
    expect(newState[toDoListId_02].length).toBe(3)
})

test('When adding a new list of tasks, a new array with tasks should be created in the task state (addTodoListAC)', () => {

    const newTodolist = {
        id: '1',
        addedDate: '',
        order: 0,
        title: 'new todolist',
    }

    const newState = taskReducer(initialState, addTodoListAC(newTodolist))

    const keys = Object.keys(newState)
    const newKey = keys.find(k => k !== toDoListId_01 && k !== toDoListId_02)
    if (!newKey) {
        throw Error('no key')
    }

    expect(keys.length).toBe(3)
    expect(newState[newKey]).toEqual([])

})

test('When adding to-do lists, the task states should change (setTodolists)', () => {

    const action = setTodolistsAC([
        {id: '1', title: 'title1', order: 0, addedDate: ''},
        {id: '2', title: 'title2', order: 0, addedDate: ''}
    ])

    const endState = taskReducer({}, action)

    const keys = Object.keys(endState)

    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('Tasks should be added to the state (setTasks)', () => {

    const action = setTasksAC([
        {
            id: v1(), title: 'title1', status: TaskStatuses.New,
            order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
            completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
        }
    ], 'todolistId1')

    const endState = taskReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    expect(endState['todolistId2']).toStrictEqual([])
    expect(endState['todolistId1'][0].title).toBe('title1')
})


