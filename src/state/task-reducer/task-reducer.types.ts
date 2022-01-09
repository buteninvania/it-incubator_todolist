import { AddTodoListActionType, RemoveTodoListActionType } from "../todolist-reducer"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type AddTaskActionType = { type: 'ADD_TASK', title: string, toDoListId: string }
export type RemoveTaskActionType = { type: 'REMOVE_TASK', id: string, toDoListId: string }
export type ChangeIsDoneTaskActionType = { type: 'CHANGE_IS_DONE_TASK', id: string, toDoListId: string }
export type ChangeTaskTitleActionType = { type: 'CHANGE_TASK_TITLE', id: string, toDoListId: string , title: string}
export type TaskActionType = AddTaskActionType | RemoveTaskActionType | ChangeIsDoneTaskActionType | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType