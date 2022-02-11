import {combineReducers, createStore, applyMiddleware} from 'redux';
import {taskReducer} from './task-reducer/task-reducer';
import {todoListReducer} from './todolist-reducer/todolist-reducer';
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todoListReducer,
    task: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store