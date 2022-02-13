import {v1} from 'uuid';
import {TaskPrioritys, TaskStatuses} from '../../api/todolist-api';
import {taskReducer} from '../task-reducer/task-reducer';
import {TaskStateType} from '../task-reducer/task-reducer.types';
import {addTodoListAC, removeTodoListAC, todoListReducer} from './todolist-reducer';
import { ToDoListDomainType } from './todolist-reducer.types';

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<ToDoListDomainType> = [];

    const newTodolist = {id: '1', title: 'new todolist', filter: 'all', addedDate: '', order: 0}

    const action = addTodoListAC(newTodolist)

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe('1');
    expect(idFromTodolists).toBe('1');
});

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: '2', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: '3', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId2', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: '2', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId2', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: '3', title: 'CSS', status: TaskStatuses.Completed,
                order: 0, todoListId: 'todolistId2', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
        ]
    };

    const action = removeTodoListAC('todolistId2')

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});

