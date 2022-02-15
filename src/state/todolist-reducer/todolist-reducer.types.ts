import { TodoListType } from '../../api/todolist-api';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodolistsAC,
} from './todolist-reducer';

/** todolist state type */
export type ToDoListDomainType = TodoListType & {
  filter: FilterType
}

/** root action type */
export type TodolistsActionType =
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof setTodolistsAC>

/** filter types */
export type FilterType = 'all' | 'completed' | 'active'