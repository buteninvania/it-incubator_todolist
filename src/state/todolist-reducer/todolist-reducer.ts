import {Dispatch} from 'redux'
import {v1} from 'uuid'
import {todolistAPI, TodoListType} from '../../api/todolist-api'
import {ActionType, FilterType, ToDoListDomainType} from './todolist-reducer.types'

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
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state
    }
}

export const addTodoListAC = (title: string) => ({type: 'ADD-TODOLIST', title, id: v1()} as const)
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodoListTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: TodoListType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then(res => dispatch(setTodolistsAC(res)))
}
