import { v1 } from 'uuid';
import {TaskItemType, TaskPrioritys, TaskStatuses} from '../../api/todolist-api';
import {
    AddTaskActionType,
    ChangeIsDoneTaskActionType,
    ChangeTaskTitleActionType,
    RemoveTaskActionType,
    TaskActionType,
    TaskStateType
} from './task-reducer.types';

const initialState: TaskStateType = {}

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => (
    {type: 'ADD_TASK', title, toDoListId}
)
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskActionType => (
    {type: 'REMOVE_TASK', id, toDoListId}
)
export const changeIsDoneTaskAC = (id: string, toDoListId: string, status: TaskStatuses): ChangeIsDoneTaskActionType => (
    {type: 'CHANGE_IS_DONE_TASK', id, toDoListId, status}
)
export const changeTaskTitleAC = (id: string, toDoListId: string, title: string): ChangeTaskTitleActionType => (
    {type: 'CHANGE_TASK_TITLE', id, toDoListId, title}
)

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
        default:
            return state
    }
}


