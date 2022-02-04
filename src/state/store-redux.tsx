import {combineReducers, createStore} from 'redux';
import {taskReducer} from './task-reducer/task-reducer';
import {todoListReducer} from './todolist-reducer/todolist-reducer';

const rootReducer = combineReducers({
    todolists: todoListReducer,
    task: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store