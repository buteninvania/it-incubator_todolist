import React, {useState} from 'react';
import './App.css';
import './css/animations.css'
import {TodoList} from './components/todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/add-item-form/AddItemForm';

function App() {

    const toDoListId_01 = v1()

    /****************** Tasks Store *************/

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId_01]: [{id: v1(), title: 'Check mail ;)', isDone: false}],
    })

    const addTask = (title: string, toDoListId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const copyState = {...tasks}
        copyState[toDoListId] = [newTask, ...tasks[toDoListId]]
        setTasks(copyState)
    }
    const removeTask = (id: string, toDoListId: string) => {
        tasks[toDoListId] = tasks[toDoListId].filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const changeIsDoneTask = (id: string, toDoListId: string) => {
        const copyState = {...tasks}
        copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {...t, isDone: !t.isDone} : t)]
        setTasks(copyState)
    }
    const changeTaskTitle = (id: string, toDoListId: string, title: string) => {
        const copyState = {...tasks}
        copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {...t, title} : t)]
        setTasks(copyState)
    }

    /*************************************************/

    /******************* ToDoLists Store *************/

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoListId_01, title:'Tasks for today', filter: 'all'},
    ])

    const addToDoList = (title: string) => {
        const toDoListId = v1()
        const newTodoList: ToDoListType = {id: toDoListId, title, filter: 'all'}
        setToDoLists([...toDoLists, newTodoList])
        setTasks({...tasks, [toDoListId]: []})
    }
    const removeToDoList = (id: string) => setToDoLists([...toDoLists.filter(todoList => todoList.id !== id)])
    const changeFilter = (filter: FilterType, toDoListId: string) => setToDoLists(toDoLists.map(t => t.id === toDoListId ? {...t, filter} : t))
    const changeToDoListTitle = (id: string, title: string) => setToDoLists(toDoLists.map(t => t.id === id ? {...t, title: title} : t))

    /*************************************************/

    return (
        <div className="app-wrapper">
            <AddItemForm addItem={addToDoList} />
            <div className="todolist-wrapper">
                {toDoLists.map(toDoList => {
                    const filteredTask = toDoList.filter === "active" ? tasks[toDoList.id].filter(t => !t.isDone)
                         : toDoList.filter === "completed" ? tasks[toDoList.id].filter(t => t.isDone) : tasks[toDoList.id]
                    return <TodoList key={toDoList.id} id={toDoList.id}
                                     filter={toDoList.filter} title={toDoList.title}
                                     tasks={filteredTask} removeToDoList={removeToDoList}
                                     changeFilter={changeFilter} removeTask={removeTask}
                                     addTask={addTask} changeTaskTitle={changeTaskTitle}
                                     changeToDoListTitle={changeToDoListTitle} changeIsDone={changeIsDoneTask}
                    />
                })}
            </div>
        </div>
    );
}

export default App;

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type ToDoListType = {
    id: string
    filter: FilterType
    title: string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'completed' | 'active'


