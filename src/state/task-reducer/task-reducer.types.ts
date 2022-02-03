import { AddTodoListActionType, RemoveTodoListActionType } from "../todolist-reducer"

/**
 * task data type
 */
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

/**
 * task state type
 */
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

/**
 * actios
 */
export type AddTaskActionType = { type: 'ADD_TASK', title: string, toDoListId: string }
export type RemoveTaskActionType = { type: 'REMOVE_TASK', id: string, toDoListId: string }
export type ChangeIsDoneTaskActionType = { type: 'CHANGE_IS_DONE_TASK', id: string, toDoListId: string }
export type ChangeTaskTitleActionType = { type: 'CHANGE_TASK_TITLE', id: string, toDoListId: string , title: string}

export type TaskActionType = AddTaskActionType | RemoveTaskActionType
    | ChangeIsDoneTaskActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType