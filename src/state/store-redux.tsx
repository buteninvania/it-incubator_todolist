import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunkMiddleware, { ThunkAction } from 'redux-thunk';

import { taskReducer } from './task-reducer/task-reducer';
import { todoListReducer } from './todolist-reducer/todolist-reducer';
import { TaskActionType } from './task-reducer/task-reducer.types';
import { TodolistsActionType } from './todolist-reducer/todolist-reducer.types';

const rootReducer = combineReducers({
  todolists: todoListReducer,
  task: taskReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootState = ReturnType<typeof rootReducer>

export type AppActionsType =
  | TaskActionType
  | TodolistsActionType

export type AppThunk<ReturnType = void> = ThunkAction<void,
  AppRootState,
  unknown,
  AppActionsType>

// @ts-ignore
window.store = store;