import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { todolistAPI, TodoListType } from '../../api/todolist-api';
import { ActionType, FilterType, ToDoListDomainType } from './todolist-reducer.types';

const initialState: Array<ToDoListDomainType> = [];

export const todoListReducer = (state: Array<ToDoListDomainType> = initialState, action: ActionType): Array<ToDoListDomainType> => {
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

export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.getTodos()
    .then(res => dispatch(setTodolistsAC(res)));
};
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.deleteTodo(id)
    .then(res => {
      dispatch(removeTodoListAC(id));
    });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.createTodo(title)
    .then(res => {
      const todolist = res.data.item;
      dispatch(addTodoListAC(todolist));
    });
};
export const changeTodoListTitleTC = ((title: string, id: string) => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.updateTodolistTitle(id, title)
    .then(res => {
      dispatch(changeTodoListTitleAC(title, id));
    });
});
