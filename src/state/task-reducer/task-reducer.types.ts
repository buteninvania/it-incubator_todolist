import {TaskItemType, TaskStatuses} from '../../api/todolist-api'
import {AddTodoListActionType, RemoveTodoListActionType} from '../todolist-reducer/todolist-reducer'

/** task state type */
export type TaskStateType = {
    [key: string]: Array<TaskItemType>
}

/** action types */
export type AddTaskActionType = { type: 'ADD_TASK', title: string, toDoListId: string }
export type RemoveTaskActionType = { type: 'REMOVE_TASK', id: string, toDoListId: string }
export type ChangeIsDoneTaskActionType = { type: 'CHANGE_IS_DONE_TASK', id: string, toDoListId: string, status: TaskStatuses }
export type ChangeTaskTitleActionType = { type: 'CHANGE_TASK_TITLE', id: string, toDoListId: string, title: string }

/** root action type */
export type TaskActionType = AddTaskActionType | RemoveTaskActionType
    | ChangeIsDoneTaskActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType