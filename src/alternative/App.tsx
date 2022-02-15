 import React, {useState} from 'react';
import './../app/App.css';
import './css/animations.css'
import {TodoList} from '../components/todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../components/add-item-form/AddItemForm';
import {TaskStateType} from '../state/task-reducer/task-reducer.types';
import {TaskPrioritys, TaskStatuses} from '../api/todolist-api';
 import {FilterType, ToDoListDomainType } from '../state/todolist-reducer/todolist-reducer.types';

function App() {

    const toDoListId_01 = v1()

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId_01]: [
            {
                id: v1(), title: '', status: TaskStatuses.Completed,
                order: 0, todoListId: toDoListId_01, addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            }
        ],
    })

    const addTask = (title: string, toDoListId: string) => {
        const newTask = {
            id: v1(), title: '', status: TaskStatuses.Completed,
            order: 0, todoListId: toDoListId_01, addedDate: '', description: '',
            completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
        }
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
        copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {
            ...t,
            status: TaskStatuses.Completed
        } : t)]
        setTasks(copyState)
    }
    const changeTaskTitle = (id: string, toDoListId: string, title: string) => {
        const copyState = {...tasks}
        copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {...t, title} : t)]
        setTasks(copyState)
    }

    const [toDoLists, setToDoLists] = useState<Array<ToDoListDomainType>>([
        {id: toDoListId_01, title: 'Tasks for today', filter: 'all', addedDate: '', order: 0},
    ])

    const addToDoList = (title: string) => {
        const toDoListId = v1()
        const newTodoList: ToDoListDomainType = {id: toDoListId, title, filter: 'all', addedDate: '', order: 0}
        setToDoLists([...toDoLists, newTodoList])
        setTasks({...tasks, [toDoListId]: []})
    }
    const removeToDoList = (id: string) => setToDoLists([...toDoLists.filter(todoList => todoList.id !== id)])
    const changeFilter = (filter: FilterType, toDoListId: string) => setToDoLists(toDoLists.map(t => t.id === toDoListId ? {
        ...t,
        filter
    } : t))
    const changeToDoListTitle = (id: string, title: string) => setToDoLists(toDoLists.map(t => t.id === id ? {
        ...t,
        title: title
    } : t))

    return (
        <div className="app-wrapper">
            <AddItemForm addItem={addToDoList}/>
            <div className="todolist-wrapper">
                {toDoLists.map(toDoList => {
                    const filteredTask = toDoList.filter === 'active' ? tasks[toDoList.id].filter(t => t.status === TaskStatuses.InProgress)
                        : toDoList.filter === 'completed' ? tasks[toDoList.id].filter(t => t.status === TaskStatuses.Completed) : tasks[toDoList.id]
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




