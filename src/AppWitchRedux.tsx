import React, {useReducer, useState} from 'react';
import './App.css';
import './css/animations.css'
import {TodoList} from './components/todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/add-item-form/AddItemForm';
import { TaskStateType } from './state/task-reducer/task-reducer.types';
import {addTaskAC, taskReducer, removeTaskAC, changeIsDoneTaskAC, changeTaskTitleAC } from './state/task-reducer/task-reducer';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReducer } from './state/todolist-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store-redux';

function AppWitchRedux() {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.task)
    const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)

    /****************** Tasks Store *************/

    const addTask = (title: string, toDoListId: string) => dispatch(addTaskAC(title,toDoListId))
    const removeTask = (id: string, toDoListId: string) => dispatch(removeTaskAC(id, toDoListId))
    const changeIsDoneTask = (id: string, toDoListId: string) => dispatch(changeIsDoneTaskAC(id, toDoListId))
    const changeTaskTitle = (id: string, toDoListId: string, title: string) => dispatch(changeTaskTitleAC(id, toDoListId, title))

    /*************************************************/

    /******************* ToDoLists Store *************/


    const addToDoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }
    const removeToDoList = (id: string) => {
        dispatch(removeTodoListAC(id))
    }
    const changeFilter = (filter: FilterType, toDoListId: string) => dispatch(changeTodoListFilterAC(toDoListId, filter))
    const changeToDoListTitle = (id: string, title: string) => dispatch(changeTodoListTitleAC(title, id))

    /*************************************************/

    return (
        <div className="app-wrapper">
            <AddItemForm addItem={addToDoList} />
            <div className="todolist-wrapper">
                {todolists.map(toDoList => {
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

export default AppWitchRedux;

export type ToDoListType = {
    id: string
    filter: FilterType
    title: string
}

export type FilterType = 'all' | 'completed' | 'active'
