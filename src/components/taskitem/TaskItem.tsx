import {Button} from '../button/Button';
import React, {MouseEvent} from 'react';
import s from './taskitem.module.css'
import { TaskType } from '../../App';
import {EditableSpan} from '../editable-span/EditableSpan';

/*******************TaskItem component*********************/

export const TaskItem: React.FC<TaskItemPropsType> = ({task, changeIsDone, onRemoveTaskHandler, toDoListId, changeTaskTitle}) => {

    const onChangeIsDoneHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.ctrlKey && changeIsDone(task.id, toDoListId)
    }
    const onChangeTaskTitle = (title: string) => changeTaskTitle(task.id, toDoListId, title)

    return (
        <li key={task.id} className={!task.isDone ? s.taskItem : s.taskItem + ' ' + s.isDone}>
            <div className={s.contentText} onClick={onChangeIsDoneHandler}>
                <EditableSpan onChangeSpan={onChangeTaskTitle} title={task.title} />
            </div>
            <Button name={'X'} callBack={() => onRemoveTaskHandler(task.id, toDoListId)}/>
        </li>
    )
};

type TaskItemPropsType = {
    toDoListId: string
    task: TaskType
    changeIsDone: (id: string, toDoListId: string) => void
    onRemoveTaskHandler: (id: string, idTodoList: string) => void
    changeTaskTitle: (id: string, toDoListId: string, title: string) => void
};

/*************************************************************/
