import React, {useCallback} from 'react';
import {TaskItem} from '../taskitem/TaskItem';
import s from './todolist.module.css';
import {CgCloseR} from 'react-icons/cg';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {Button} from '../button/Button';
import {EditableSpan} from '../editable-span/EditableSpan';
import {TaskItemType, TaskStatuses} from '../../api/todolist-api';
import {FilterType} from '../../state/todolist-reducer/todolist-reducer';

export type TodoListPropsType = {
    /**
     * todolist id
     */
    id: string
    /**
     * todolist title
     */
    title: string
    /**
     * array of tasks that belong to the current list
     */
    tasks: Array<TaskItemType>
    /**
     * callback function for remove task
     * @param id - string
     * @param toDoListId - todolist id
     */
    removeTask: (id: string, toDoListId: string) => void
    /**
     * callback function for remove todolist
     * @param id - string
     */
    removeToDoList: (id: string) => void
    /**
     * callback function for to add a task
     * @param title - string
     * @param toDoListId - todolist id
     */
    addTask: (title: string, toDoListId: string) => void
    /**
     * callback function for to change the status of a task
     * @param id - task id
     * @param toDoListId - todolist id
     * @param status - task statuses
     */
    changeIsDone: (id: string, toDoListId: string, status: TaskStatuses) => void
    /**
     * callback function for to change the filter of a todolist
     * @param filter
     * @param toDoListId
     */
    changeFilter: (filter: FilterType, toDoListId: string) => void
    /**
     * filter value
     */
    filter: FilterType
    /**
     * callback function for to change the title of a task
     * @param id - task id
     * @param toDoListId - todolist id
     * @param title - task title
     */
    changeTaskTitle: (id: string, toDoListId: string, title: string) => void
    /**
     * callback function for to change the title of a todolist
     * @param id - task id
     * @param title - todolist id
     */
    changeToDoListTitle: (id: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     title, tasks,
                                                                     removeTask, addTask,
                                                                     changeIsDone, id,
                                                                     removeToDoList, changeFilter,
                                                                     filter, changeTaskTitle,
                                                                     changeToDoListTitle
                                                                 }) => {

    const onChangeTodoListTitle = useCallback((title: string) => changeToDoListTitle(id, title), [changeToDoListTitle, id])
    const onRemoveTaskHandler = useCallback((id: string, toDoListId: string) => removeTask(id, toDoListId), [removeTask])

    const filteredTask = filter === 'active' ? tasks.filter(t => t.status === TaskStatuses.New) :
        filter === 'completed' ? tasks.filter(t => t.status === TaskStatuses.Completed) : tasks

    return (
        <div className={s.wrapper}>
            <CgCloseR onClick={() => removeToDoList(id)} className={s.closeSvg}/>
            <h3 className={s.header}>
                <EditableSpan onChangeSpan={onChangeTodoListTitle} title={title}/>
            </h3>
            <AddItemForm addItem={(title: string) => addTask(title, id)}/>
            <ul className={s.itemsList}>
                {filteredTask.map(t => <TaskItem toDoListId={id} task={t} key={t.id} changeIsDone={changeIsDone}
                                                 onRemoveTaskHandler={onRemoveTaskHandler}
                                                 changeTaskTitle={changeTaskTitle}/>)}
            </ul>
            <div className={s.btnWrapper}>
                <Button active={filter === 'all'} name={'All'} callBack={() => changeFilter('all', id)}/>
                <Button active={filter === 'active'} name={'Active'} callBack={() => changeFilter('active', id)}/>
                <Button active={filter === 'completed'} name={'Completed'}
                        callBack={() => changeFilter('completed', id)}/>
            </div>

        </div>
    )
})
