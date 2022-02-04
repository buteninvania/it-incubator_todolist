import {v1} from 'uuid'
import {TodoListType} from '../../api/todolist-api'

export type AddTodoListActionType = { type: 'ADD-TODOLIST', title: string, id: string }
export type RemoveTodoListActionType = { type: 'REMOVE-TODOLIST', id: string }
export type ChangeTodoListTitleActionType = { type: 'CHANGE-TODOLIST-TITLE', id: string, title: string }
export type ChangeTodolistFilterActionType = { type: 'CHANGE-TODOLIST-FILTER', id: string, filter: FilterType }

export const addTodoListAC = (title: string): AddTodoListActionType => ({type: 'ADD-TODOLIST', title, id: v1()})
export const removeTodoListAC = (id: string): RemoveTodoListActionType => ({type: 'REMOVE-TODOLIST', id})
export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})
export const changeTodoListFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})

type ActionType =
    AddTodoListActionType
    | RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodolistFilterActionType

export type FilterType = 'all' | 'completed' | 'active'

export type ToDoListDomainType = TodoListType & {
    filter: FilterType
}

const initialState: Array<ToDoListDomainType> = []

export const todoListReducer = (state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return state
    }
}