import {Button} from '../button/Button';
import React, {MouseEvent} from 'react';
import s from './Taskitem.module.css'
import {EditableSpan} from '../editable-span/EditableSpan';
import { TaskType } from '../../state/task-reducer/task-reducer.types';

interface TaskItemPropsType {
    /**
     * From what list of tasks?
     */
    toDoListId: string
    /**
     * Pass task data
     */
    task: TaskType
    /**
     * @param id type: string (task id)
     * @param toDoListId string (todolis id)
     */
    changeIsDone: (id: string, toDoListId: string) => void
    /**
     * @param id type: string (task id)
     * @param idTodoList string (todolis id)
     */
    onRemoveTaskHandler: (id: string, idTodoList: string) => void
    /**
     * @param id
     * @param toDoListId
     * @param title
     */
    changeTaskTitle: (id: string, toDoListId: string, title: string) => void
};

export const TaskItem: React.FC<TaskItemPropsType> = React.memo(({task, changeIsDone, onRemoveTaskHandler, toDoListId, changeTaskTitle}) => {

    const onChangeIsDoneHandler = (e: MouseEvent<HTMLDivElement>) => {

        e.ctrlKey && changeIsDone(task.id, toDoListId)
    }
    const onChangeTaskTitle = (title: string) => changeTaskTitle(task.id, toDoListId, title)

    console.log('task item')

    return (
        <li key={task.id} className={!task.isDone ? s.taskItem : s.taskItem + ' ' + s.isDone}>
            <div className={s.contentText} onClick={onChangeIsDoneHandler}>
                <EditableSpan onChangeSpan={onChangeTaskTitle} title={task.title} />
            </div>
            <Button name={'X'} callBack={() => onRemoveTaskHandler(task.id, toDoListId)}/>
        </li>
    )
});



