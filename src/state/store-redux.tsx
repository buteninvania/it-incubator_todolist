import {combineReducers, createStore } from "redux";
import { ToDoListType } from "../AppWitchRedux";
import { taskReducer } from "./task-reducer/task-reducer";
import { TaskStateType } from "./task-reducer/task-reducer.types";
import { todoListReducer } from "./todolist-reducer";

const rootReducer = combineReducers({
    todolists: todoListReducer,
    task: taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store