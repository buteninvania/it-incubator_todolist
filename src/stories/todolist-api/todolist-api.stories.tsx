import React, {useEffect, useState} from 'react'
import {todolistAPI, TodoListResponseType } from '../../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodoListResponseType[] | null>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then(res => {
                setState(res)
            })
        return
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<TodoListResponseType[] | null>(null)
    const [inputValue, setInputValue] = useState<string>('')

    const createTodolist = async () => {
        if (inputValue) {
            let response = await todolistAPI.createTodo(inputValue)
            if (response.resultCode === 0) {
                const todolists = await todolistAPI.getTodos()
                setState(todolists)
            }
        }
    }

    return (
        <div>
            <input type="text" onChange={e => setInputValue(e.currentTarget.value)} value={inputValue}/>
            {state && state.map(i => <div key={i.id}>{i.title}</div>)}
            <button onClick={createTodolist}>Create todolist</button>
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<TodoListResponseType[] | null>(null)
    const [loader, setLoader] = useState<boolean>(false)
    useEffect(() => {
        todolistAPI.getTodos().then(res => setState(res))
    }, [])

    const deleteTask = async (todolistId: string) => {
        const response = await todolistAPI.deleteTodo(todolistId)
        if (response.resultCode === 0) {
            const todolists = await todolistAPI.getTodos()
            setState(todolists)
        }
    }

    return (
        <div>
            {state && state.map(t =>
                <div key={t.id}>
                    <span>{t.title}</span>
                    <button onClick={() => deleteTask(t.id)}>delete</button>
                </div>)}
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<TodoListResponseType[] | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    useEffect(() => {
        todolistAPI.getTodos().then(res => setState(res))
    }, [])

    const updateTitle = async (todolistId: string) => {
        let response = await todolistAPI.updateTodoTitle(todolistId, inputValue)
        if(response.resultCode === 0) {
            let todolists = await todolistAPI.getTodos()
            setState(todolists)
        }
    }

    return (
        <div>
            <input type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.currentTarget.value)}
                   placeholder='enter title'/>
            {state && state.map(t => {
                return (
                    <div>
                        <span>{t.title}</span>
                        <button onClick={() => updateTitle(t.id)}>Update title</button>
                    </div>
                )
            })}
        </div>
    )
}

