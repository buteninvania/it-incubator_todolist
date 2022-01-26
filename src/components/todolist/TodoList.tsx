import React, { useCallback } from 'react';
import {TaskItem} from '../taskitem/TaskItem';
import s from './todolist.module.css'
import {CgCloseR} from 'react-icons/cg'
import {FilterType} from '../../App';
import {AddItemForm} from '../add-item-form/AddItemForm';
import { Button } from '../button/Button';
import { EditableSpan } from '../editable-span/EditableSpan';
import { TaskType } from '../../state/task-reducer/task-reducer.types';

export const TodoList: React.FC<TodoListPropsType> = React.memo(({title, tasks,
                                                          removeTask, addTask,
                                                          changeIsDone, id,
                                                          removeToDoList, changeFilter,
                                                          filter, changeTaskTitle,
                                                          changeToDoListTitle}) => {

    const onChangeTodoListTitle = useCallback((title: string) => changeToDoListTitle(id, title), [changeToDoListTitle, id])
    const onRemoveTaskHandler = useCallback((id: string, toDoListId: string) => removeTask(id, toDoListId), [removeTask])

    console.log('super-todolist')

    const filteredTask = filter === "active" ? tasks.filter(t => !t.isDone) :
                         filter === "completed" ? tasks.filter(t => t.isDone) : tasks

    return (
        <div className={s.wrapper}>
            <CgCloseR onClick={() => removeToDoList(id)} className={s.closeSvg}/>
            <h3 className={s.header}>
               <EditableSpan onChangeSpan={onChangeTodoListTitle} title={title}/>
            </h3>
            <AddItemForm addItem={(title: string) => addTask(title, id)}/>
            <ul className={s.itemsList}>
                {filteredTask.map(t => <TaskItem toDoListId={id} task={t} key={t.id} changeIsDone={changeIsDone} onRemoveTaskHandler={onRemoveTaskHandler} changeTaskTitle={changeTaskTitle}/>)}
            </ul>
            <div className={s.btnWrapper}>
                <Button active={filter === "all"} name={'All'} callBack={() => changeFilter('all', id)}/>
                <Button active={filter === "active"} name={'Active'} callBack={() => changeFilter('active', id)}/>
                <Button active={filter === "completed"} name={'Completed'} callBack={() => changeFilter('completed', id)}/>
            </div>

        </div>
    )
})

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, toDoListId: string) => void
    removeToDoList: (id: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeIsDone: (id: string, toDoListId: string) => void
    changeFilter: (filter: FilterType, toDoListId: string) => void
    filter: FilterType
    changeTaskTitle: (id: string, toDoListId: string, title: string) => void
    changeToDoListTitle: (id: string, title: string) => void
}
