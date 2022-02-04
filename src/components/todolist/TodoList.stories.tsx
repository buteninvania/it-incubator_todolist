import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import {v1} from 'uuid';
import {TaskPrioritys, TaskStatuses } from '../../api/todolist-api';
import {TodoList, TodoListPropsType} from './TodoList';

export default {
    title: 'Todolist/TodoList',
    component: TodoList,
    argTypes: {
        title: {
            description: 'todolist title',
            defaultValue: 'React learn'
        },
        tasks: {
            description: 'array of tasks that belong to the current list'
        },
        removeTask: {
            description: 'callback function for remove todolist'
        },
        removeToDoList: {
            description: 'callback function for remove todolist'
        },
        addTask: {
            description: 'callback function for to add a task'
        },
        changeIsDone: {
            description: 'callback function for to change the status of a task'
        },
        changeFilter: {
            description: 'callback function for to change the filter of a todolist'
        },
        filter: {
            description: 'filter value',
            defaultValue: 'all'
        },
        changeTaskTitle: {
            description: 'callback function for to change the title of a task',
        },
        changeToDoListTitle: {
            description: 'callback function for to change the title of a todolist',
        }
    }
} as Meta;

const removeTaskCallback = action('Delete task')
const removeToDoListCallback = action('Delete Todolist')
const addTaskCallback = action('Add task')
const changeIsDoneCallback = action('Change task status')
const changeFilterCallback = action('Change list filter')
const changeTaskTitleCallback = action('Change task name')
const changeToDoListTitleCallback = action('Change the name of the task list')

const Template: Story<TodoListPropsType> = (args) => <TodoList {...args}/>

const baseArgs = {
    removeTask: removeTaskCallback,
    removeToDoList: removeToDoListCallback,
    addTask: addTaskCallback,
    changeIsDone: changeIsDoneCallback,
    changeFilter: changeFilterCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeToDoListTitle: changeToDoListTitleCallback
}

export const TodoListStory = Template.bind({})

TodoListStory.args = {
    ...baseArgs,
    tasks: [
        {id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''},
        {id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''},
        {id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''},
        {id: v1(), title: 'Learn typescript', status: TaskStatuses.InProgress,
        order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
        completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''}
    ],
    id: v1()
}