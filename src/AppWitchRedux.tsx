import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './components/todolist/TodoList';
import {AddItemForm} from './components/add-item-form/AddItemForm';
import {TaskStateType} from './state/task-reducer/task-reducer.types';
import {addTaskAC, removeTaskAC, changeIsDoneTaskAC, changeTaskTitleAC} from './state/task-reducer/task-reducer';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store-redux';

export type ToDoListType = {
    id: string
    filter: FilterType
    title: string
}

export type FilterType = 'all' | 'completed' | 'active'

function AppWitchRedux() {

    const dispatch = useDispatch()
    
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.task)
    const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)

    const addTask = useCallback((title: string, toDoListId: string) => dispatch(addTaskAC(title, toDoListId)), [dispatch])
    const removeTask = useCallback((id: string, toDoListId: string) => dispatch(removeTaskAC(id, toDoListId)), [dispatch])
    const changeIsDoneTask = useCallback((id: string, toDoListId: string) => dispatch(changeIsDoneTaskAC(id, toDoListId)), [dispatch])
    const changeTaskTitle = useCallback((id: string, toDoListId: string, title: string) => dispatch(changeTaskTitleAC(id, toDoListId, title)), [dispatch])
    
    const addToDoList = useCallback((title: string) => dispatch(addTodoListAC(title)), [dispatch])
    const removeToDoList = useCallback((id: string) => dispatch(removeTodoListAC(id)), [dispatch])
    const changeFilter = useCallback((filter: FilterType, toDoListId: string) => dispatch(changeTodoListFilterAC(toDoListId, filter)), [dispatch])
    const changeToDoListTitle = useCallback((id: string, title: string) => dispatch(changeTodoListTitleAC(title, id)), [dispatch])
    
    console.log('App-Redux')

    return (
        <div className="app-wrapper">
            <AddItemForm addItem={addToDoList}/>
            <div className="todolist-wrapper">
                {todolists.map(toDoList => {

                    return <TodoList key={toDoList.id} id={toDoList.id}
                                     filter={toDoList.filter} title={toDoList.title}
                                     tasks={tasks[toDoList.id]} removeToDoList={removeToDoList}
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

