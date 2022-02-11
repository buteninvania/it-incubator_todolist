import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {TaskItemType, TaskPrioritys, TaskStatuses, todolistAPI} from '../../api/todolist-api';
import {TaskActionType, TaskStateType} from './task-reducer.types';

const initialState: TaskStateType = {}

export const addTaskAC = (title: string, toDoListId: string) => ({type: 'ADD_TASK', title, toDoListId} as const)
export const removeTaskAC = (id: string, toDoListId: string) => ({type: 'REMOVE_TASK', id, toDoListId} as const)
export const changeIsDoneTaskAC = (id: string, toDoListId: string, status: TaskStatuses) => ({
    type: 'CHANGE_IS_DONE_TASK',
    id,
    toDoListId,
    status
} as const)
export const changeTaskTitleAC = (id: string, toDoListId: string, title: string) => ({
    type: 'CHANGE_TASK_TITLE',
    id,
    toDoListId,
    title
} as const)
export const setTasksAC = (tasks: TaskItemType[], todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

/** create new task function (function creator)*/
const creteTask = (title: string): TaskItemType => {
    return {
        id: v1(), title, status: TaskStatuses.New,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
    }
}

export const taskReducer = (state: TaskStateType = initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                [action.toDoListId]: [creteTask(action.title), ...state[action.toDoListId]]
            }
        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id)}
        case 'CHANGE_IS_DONE_TASK':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(res, todolistId)))
}

