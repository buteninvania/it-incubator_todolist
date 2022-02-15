import { AppThunk } from 'state/store-redux';
import { todolistAPI, TodoListType } from '../../api/todolist-api';
import {
  FilterType,
  ToDoListDomainType,
  TodolistsActionType,
} from './todolist-reducer.types';

const initialState: Array<ToDoListDomainType> = [];

export const todoListReducer = (state: Array<ToDoListDomainType> = initialState, action: TodolistsActionType): Array<ToDoListDomainType> => {
  switch (action.type) {
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state];
    case 'REMOVE-TODOLIST':
      return state.filter(t => t.id !== action.id);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t);
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t);
    case 'SET-TODOLISTS':
      return action.todolists.map(t => ({ ...t, filter: 'all' }));
    default:
      return state;
  }
};

/** actions creators */
export const addTodoListAC = (todolist: TodoListType) =>
  ({ type: 'ADD-TODOLIST', todolist } as const);
export const removeTodoListAC = (id: string) =>
  ({ type: 'REMOVE-TODOLIST', id } as const);
export const changeTodoListTitleAC = (title: string, id: string) =>
  ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const);
export const changeTodoListFilterAC = (id: string, filter: FilterType) =>
  ({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const);
export const setTodolistsAC = (todolists: TodoListType[]) =>
  ({ type: 'SET-TODOLISTS', todolists } as const);

/** thunk creators*/
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  const res = await todolistAPI.getTodos();
  dispatch(setTodolistsAC(res));
};
export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
  const res = await todolistAPI.deleteTodo(id);
  dispatch(removeTodoListAC(id));
};
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
  const res = await todolistAPI.createTodo(title);
  const newTodolist = res.data.item;
  dispatch(addTodoListAC(newTodolist));
};
export const changeTodoListTitleTC = ((title: string, id: string): AppThunk => async dispatch => {
  const res = await todolistAPI.updateTodolistTitle(id, title);
  dispatch(changeTodoListTitleAC(title, id));
});
