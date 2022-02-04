import {ComponentMeta, ComponentStory, Meta, Story} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {TaskItem, TaskItemPropsType} from './TaskItem';
import {TaskPrioritys, TaskStatuses } from '../../api/todolist-api';

export default {
    title: 'Todolist/TaskItem',
    component: TaskItem,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskItemPropsType> = (args) => <TaskItem {...args}/>

const baseArgs = {
    changeIsDone: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    onRemoveTaskHandler: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({})

TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'Learn typescript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''},
    toDoListId: 'todoListId',
}
