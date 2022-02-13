import {TaskItemType, TaskStatuses} from '../../api/todolist-api'
import {addTodoListAC, removeTodoListAC, setTodolistsAC } from '../todolist-reducer/todolist-reducer'
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from './task-reducer'

/** task state type */
export type TaskStateType = {
    [key: string]: Array<TaskItemType>
}

/** root action type */
export type TaskActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>



