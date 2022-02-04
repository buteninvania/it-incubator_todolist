import {AxiosResponse} from 'axios';
import {instance} from './api';

/** base response type from the server */
type BaseResponseType<D = null> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

/** todolist response type */
export type TodoListResponseType = {
    id: string
    addedDate: Date
    order: number
    title: string
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
    getTodos: () => instance.get<TodoListResponseType[]>('todo-lists')
        .then(res => res.data),
    /**
     * url: https://social-network.samuraijs.com/api/1.1/todo-lists
     * @param title - string, for the title of the new task list
     * method: POST
     * payload: title - string
     * response: BaseResponseType where data TodoListResponseType
     * method to create a new task list
     */
    createTodo: (title: string) => instance.post<BaseResponseType<{item: TodoListResponseType}>,
        AxiosResponse<BaseResponseType<TodoListResponseType>>, {title: string}>('todo-lists', {title})
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
     * @param todolistId - string, to know which to-do list to delete
     * @param title - string, for the title of the new task list
     * method: PUT
     * payload: title - string
     * response: BaseResponseType
     * method to update to-do list title
     */
    updateTodoTitle: (todolistId: string, title: string) => instance.put<BaseResponseType<{item: TodoListResponseType}>,
        AxiosResponse<BaseResponseType<{item: TodoListResponseType}>>, {title: string}>(`todo-lists/${todolistId}`, {title})
        .then(res => res.data)
}
