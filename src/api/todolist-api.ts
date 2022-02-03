import { AxiosResponse } from "axios";
import { instance } from "./api";

type BaseResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistApi = {
    getTodos: () => instance.get('todo-lists')
        .then(res => res.data),
    createTodo: () => instance.post('todo-lists', {title: "newTodolist"})
        .then(res => res.data),
    deleteTodo: (todolistId: string) => instance.delete(`${todolistId}`)
        .then(res => res.data),
    updateTodoTitle: (todolistId: string) => instance.put(`${todolistId}`, {title: 'REACT>>>>>>>>>'})
        .then(res => res.data)
}
