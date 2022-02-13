import React, {useEffect, useState} from 'react'
import {TaskItemType, todolistAPI, TodoListType} from '../../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)
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
    const [state, setState] = useState<TodoListType[] | null>(null)
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
    const [state, setState] = useState<TodoListType[] | null>(null)
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
    const [state, setState] = useState<TodoListType[] | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    useEffect(() => {
        todolistAPI.getTodos().then(res => setState(res))
    }, [])

    const updateTitle = async (todolistId: string) => {
        let response = await todolistAPI.updateTodolistTitle(todolistId, inputValue)
        if (response.resultCode === 0) {
            let todolists = await todolistAPI.getTodos()
            setState(todolists)
        }
    }

    return (
        <div>
            <input type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.currentTarget.value)}
                   placeholder="enter title"/>
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

export const GetTasks = () => {

    const [tasks, setTasks] = useState<TaskItemType[] | null>(null)
    const [todoLists, setTodoLists] = useState<TodoListType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodos().then(res => setTodoLists(res))
    }, [])

    const getTasks = async (todolistID: string) => {
        const response = await todolistAPI.getTasks(todolistID)
        setTasks(response)
    }

    return (
        <div>
            {todoLists && todoLists.map(t => <div onClick={() => getTasks(t.id)}>{t.title}</div>)}
            {tasks && tasks.map(t => <div>{t.title}</div>)}
        </div>
    )
}

export const CreateTask = () => {

    const [inputValue, setInputValue] = useState<string>('')
    const [todolists, setTodoLists] = useState<TodoListType[] | null>(null)
    const [tasks, setTasks] = useState<TaskItemType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodos().then(res => setTodoLists(res))
    }, [])

    const createTasks = async (todolistId: string) => {
        const response = await todolistAPI.createTask(todolistId, inputValue)
        if (response.resultCode === 0) {
            const tasks = await todolistAPI.getTasks(todolistId)
            setTasks(tasks)
        }
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
            {todolists && todolists.map(t => <div key={t.id} onClick={() => createTasks(t.id)}>{t.title}</div>)}
            {tasks && tasks.map(t => <div key={t.id}>{t.title}</div>)}
        </div>
    )
}

export const DeleteTask = () => {

    const [todolists, setTodoLists] = useState<TodoListType[] | null>(null)
    const [tasks, setTasks] = useState<TaskItemType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodos().then(res => setTodoLists(res))
    }, [])

    const getTasks = async (todolistID: string) => {
        const response = await todolistAPI.getTasks(todolistID)
        setTasks(response)
    }

    const deleteTask = async (todolistID: string, taskID: string) => {
        const response = await todolistAPI.deleteTask(todolistID, taskID)
        if (response.resultCode === 0) {
            const tasks = await todolistAPI.getTasks(todolistID)
            setTasks(tasks)
        }
    }

    return (
        <div>
            {todolists && todolists.map(t => <div key={t.id} onClick={() => getTasks(t.id)}>{t.title}</div>)}
            {tasks && tasks.map(t => {
                return (
                    <div key={t.id}>
                        <span>{t.title}</span>
                        <button onClick={() => deleteTask(t.todoListId, t.id)}>delete task</button>
                    </div>
                )
            })}
        </div>
    )
}

export const UpdateTask = () => {

    const [inputValue, setInputValue] = useState<string>('')
    const [todolists, setTodoLists] = useState<TodoListType[] | null>(null)
    const [tasks, setTasks] = useState<TaskItemType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodos().then(res => setTodoLists(res))
    }, [])

    const getTasks = async (todolistID: string) => {
        const response = await todolistAPI.getTasks(todolistID)
        setTasks(response)
    }

    const updateTask = async (todolistID: string, t: TaskItemType) => {
        const response = await todolistAPI.updateTask(todolistID, t.id, {...t, title: inputValue})
        if (response.resultCode === 0) {
            const tasks = await todolistAPI.getTasks(todolistID)
            setTasks(tasks)
        }
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
            {todolists && todolists.map(t => <div key={t.id} onClick={() => getTasks(t.id)}>{t.title}</div>)}
            {tasks && tasks.map(t => <div key={t.id} onClick={() => updateTask(t.todoListId, t)}>{t.title}</div>)}
        </div>
    )
}

