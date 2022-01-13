import React, {useReducer, useState} from 'react';
import './App.css';
import './css/animations.css'
import {TodoList} from './components/todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/add-item-form/AddItemForm';
import { TaskStateType } from './state/task-reducer/task-reducer.types';
import {addTaskAC, taskReducer, removeTaskAC, changeIsDoneTaskAC, changeTaskTitleAC } from './state/task-reducer/task-reducer';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReducer } from './state/todolist-reducer';

function AppWitchReducer() {

    const toDoListId_01 = v1()

    /****************** Tasks Store *************/

    const [tasks, taskDispatch] = useReducer(taskReducer, {[toDoListId_01]: [{id: v1(), title: 'Check mail ;)', isDone: false}]})

    const addTask = (title: string, toDoListId: string) => taskDispatch(addTaskAC(title,toDoListId))
    const removeTask = (id: string, toDoListId: string) => taskDispatch(removeTaskAC(id, toDoListId))
    const changeIsDoneTask = (id: string, toDoListId: string) => taskDispatch(changeIsDoneTaskAC(id, toDoListId))
    const changeTaskTitle = (id: string, toDoListId: string, title: string) => taskDispatch(changeTaskTitleAC(id, toDoListId, title))

    /*************************************************/

    /******************* ToDoLists Store *************/

    const [toDoLists, todoListDispatch] = useReducer(todoListReducer ,[{id: toDoListId_01, title:'Tasks for today', filter: 'all'},])

    const addToDoList = (title: string) => {
        const action = addTodoListAC(title)
        todoListDispatch(action)
        taskDispatch(action)
    }
    const removeToDoList = (id: string) => {
        todoListDispatch(removeTodoListAC(id))
        taskDispatch(removeTodoListAC(id))
    }
    const changeFilter = (filter: FilterType, toDoListId: string) => todoListDispatch(changeTodoListFilterAC(toDoListId, filter))
    const changeToDoListTitle = (id: string, title: string) => todoListDispatch(changeTodoListTitleAC(title, id))

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

export default AppWitchReducer;

export type ToDoListType = {
    id: string
    filter: FilterType
    title: string
}

export type FilterType = 'all' | 'completed' | 'active'


function useDispatch<T>(arg0: { [x: string]: { id: string; title: string; isDone: boolean; }[]; }): [any, any] {
    throw new Error('Function not implemented.');
}

