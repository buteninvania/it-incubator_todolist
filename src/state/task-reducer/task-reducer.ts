import { v1 } from "uuid";
import {
    AddTaskActionType,
    ChangeIsDoneTaskActionType,
    ChangeTaskTitleActionType,
    RemoveTaskActionType,
    TaskActionType,
    TaskStateType } from "./task-reducer.types";

const initialState: TaskStateType = {}

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => (
    {type: 'ADD_TASK', title, toDoListId}
)
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskActionType => (
    {type: 'REMOVE_TASK', id, toDoListId}
)
export const changeIsDoneTaskAC = (id: string, toDoListId: string): ChangeIsDoneTaskActionType => (
    {type: 'CHANGE_IS_DONE_TASK', id, toDoListId}
)
export const changeTaskTitleAC = (id: string, toDoListId: string, title: string): ChangeTaskTitleActionType => (
    {type: 'CHANGE_TASK_TITLE', id, toDoListId, title}
)

export const taskReducer = (state: TaskStateType = initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.toDoListId]: [ {id: v1(), title: action.title, isDone: false} , ...state[action.toDoListId]]}
        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id)}
        case 'CHANGE_IS_DONE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {...t, isDone: !t.isDone} : t)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {...t, title: action.title} : t)}
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


