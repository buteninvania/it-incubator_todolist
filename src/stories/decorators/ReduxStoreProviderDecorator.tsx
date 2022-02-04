import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {TaskPrioritys, TaskStatuses} from '../../api/todolist-api';
import {AppRootState} from '../../state/store-redux';
import {taskReducer} from '../../state/task-reducer/task-reducer';
import {todoListReducer} from '../../state/todolist-reducer/todolist-reducer';

const rootReducer = combineReducers({
    task: taskReducer,
    todolists: todoListReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    task: {
        ['todolistId1']: [
            {
                id: v1(), title: 'learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId1', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId2', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            },
            {
                id: v1(), title: 'learn typescript', status: TaskStatuses.InProgress,
                order: 0, todoListId: 'todolistId2', addedDate: '', description: '',
                completed: false, deadline: '', priority: TaskPrioritys.Hi, startDate: ''
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);
export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>

