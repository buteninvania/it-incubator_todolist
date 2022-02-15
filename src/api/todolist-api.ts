import { AxiosResponse } from 'axios';

import { instance } from './api';

/** base response type from the server */
type BaseResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

/** todolist response type */
export type TodoListType = {
  id: string
  addedDate: string
  order: number
  title: string
}

/** get task response type */
type GetTaskResponseType = {
  error: string | null
  items: TaskItemType[]
  totalCount: number
}

/** task statuses */
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

/** task priority */
export enum TaskPrioritys {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

/** model type of task properties to be updated */
export type TaskDomainModelUpdateType = {
  description?: string
  title?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TaskPrioritys
  startDate?: string
  deadline?: string
}

/** model type for updating task data on the server */
export type TaskModelUpdateType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPrioritys
  startDate: string
  deadline: string
}

/** task type from the server */
export type TaskItemType = TaskModelUpdateType & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

/**
 * base URL https://social-network.samuraijs.com/api/1.1/
 * description: an object that works with the task list API
 */
export const todolistAPI = {
  /** url: https://social-network.samuraijs.com/api/1.1/todo-lists
   *  method: GET
   *  response: Array<TodoListResponseType> as array of object
   *  method to get list of task list */
  getTodos: () => instance.get<TodoListType[]>('todo-lists')
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists
   * @param title - string, for the title of the new task list
   * method: POST
   * payload: title - string
   * response: BaseResponseType where data TodoListResponseType
   * method to create a new task list
   */
  createTodo: (title: string) => instance.post<BaseResponseType<{ item: TodoListType }>,
    AxiosResponse<BaseResponseType<{ item: TodoListType }>>, { title: string }>('todo-lists', { title })
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}
   * @param todolistId - string, to know which to-do list to delete
   * method: DELETE
   * response: BaseResponseType
   * method to delete to-do list
   */
  deleteTodo: (todolistId: string) => instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}
   * @param todolistId - string, to know which to-do list to update
   * @param title - string, for the title of the new task list
   * method: PUT
   * payload: title - string
   * response: BaseResponseType
   * method to update to-do list title
   */
  updateTodolistTitle: (todolistId: string, title: string) => instance.put<BaseResponseType<{ item: TodoListType }>,
    AxiosResponse<BaseResponseType<{ item: TodoListType }>>, { title: string }>(`todo-lists/${todolistId}`, { title })
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks
   * @param todolistId - string, in order to get the tasks of this particular to-do list
   * method: GET
   * response: object {items: array of Task, totalCount: number, error: string | null}
   * method for getting tasks for a to-do list
   */
  getTasks: (todolistId: string) => instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    .then(res => res.data.items),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks
   * @param todolistId - string, in which to-do list to put the task
   * @param title - string, Task title
   * method: POST
   * response: object BaseResponseType<{item: TaskItemType}>
   * method to create task in to-do list
   */
  createTask: (todolistId: string, title: string) => instance.post<BaseResponseType<{ item: TaskItemType }>>(`todo-lists/${todolistId}/tasks`, { title })
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}
   * method: DELETE
   * response: object BaseResponseType
   * method to remove task from to-do list
   */
  deleteTask: (todolistId: string, taskId: string) => instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    .then(res => res.data),
  /**
   * url: https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}
   * method: PUT
   * response: object BaseResponseType and data: TaskItemType
   * task name update method
   */
  updateTask: (todolistId: string, taskId: string, model: TaskModelUpdateType) => instance.put<BaseResponseType<TaskItemType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    .then(res => res.data),
};
