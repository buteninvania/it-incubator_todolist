import { v1 } from "uuid"
import {FilterType, ToDoListType } from "../App"

export type AddTodoListActionType = { type: 'ADD-TODOLIST', title: string }
export type RemoveTodoListActionType = { type: 'REMOVE-TODOLIST', id: string }
export type ChangeTodoListTitleActionType = { type: 'CHANGE-TODOLIST-TITLE', id: string, title: string }
export type ChangeTodolistFilterActionType = { type: 'CHANGE-TODOLIST-FILTER', id: string, filter: FilterType }

export const AddTodoListAC = (title: string):AddTodoListActionType => ({ type: 'ADD-TODOLIST', title })
export const RemoveTodoListAC = (id: string):RemoveTodoListActionType => ({ type: 'REMOVE-TODOLIST', id })
export const ChangeTodoListTitleAC = (title: string, id: string):ChangeTodoListTitleActionType => ({ type: 'CHANGE-TODOLIST-TITLE', id, title })
export const ChangeTodoListFilterAC = (id: string, filter: FilterType):ChangeTodolistFilterActionType => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter })

type ActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListTitleActionType | ChangeTodolistFilterActionType

export const todoListsReducer = (state: Array<ToDoListType>, action: ActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            throw new Error("I don't understand this type")
    }
}