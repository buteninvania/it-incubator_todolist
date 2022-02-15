import { Dispatch } from 'redux';
import {
  TaskDomainModelUpdateType,
  TaskItemType,
  TaskModelUpdateType,
  todolistAPI,
} from '../../api/todolist-api';
import { AppRootState } from '../store-redux';
import { TaskActionType, TaskStateType } from './task-reducer.types';

const initialState: TaskStateType = {};

export const taskReducer = (state: TaskStateType = initialState, action: TaskActionType): TaskStateType => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        [action.toDoListId]: [action.task, ...state[action.toDoListId]],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id),
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? { ...t, ...action.model } : t),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: [] };
    case 'REMOVE-TODOLIST':
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    case 'SET-TODOLISTS': {
      const copyState = { ...state };
      action.todolists.forEach(t => copyState[t.id] = []);
      return copyState;
    }
    case 'SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks };
    default:
      return state;
  }
};

/** actions creators */
export const addTaskAC = (toDoListId: string, task: TaskItemType) =>
  ({ type: 'ADD_TASK', toDoListId, task } as const);
export const removeTaskAC = (id: string, toDoListId: string) =>
  ({ type: 'REMOVE_TASK', id, toDoListId } as const);
export const updateTaskAC = (id: string, toDoListId: string, model: TaskDomainModelUpdateType) =>
  ({ type: 'UPDATE_TASK', id, toDoListId, model } as const);
export const setTasksAC = (tasks: TaskItemType[], todolistId: string) =>
  ({ type: 'SET-TASKS', tasks, todolistId } as const);

/** thunk creators*/
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskActionType>) => {
  todolistAPI.getTasks(todolistId)
    .then(res => dispatch(setTasksAC(res, todolistId)));
};

export const deleteTaskTC = (toDoListId: string, id: string) => (dispatch: Dispatch<TaskActionType>) => {
  todolistAPI.deleteTask(toDoListId, id)
    .then(res => {
      dispatch(removeTaskAC(id, toDoListId));
    });
};

export const createTaskTC = (toDoListId: string, title: string) => (dispatch: Dispatch<TaskActionType>) => {
  todolistAPI.createTask(toDoListId, title)
    .then(res => {
      const task = res.data.item;
      dispatch(addTaskAC(toDoListId, task));
    });
};

export const updateTaskTC = (id: string, toDoListId: string, domainModel: TaskDomainModelUpdateType) => (dispatch: Dispatch<TaskActionType>, getState: () => AppRootState) => {
  const state = getState();
  const task = state.task[toDoListId].find(i => i.id === id);
  if (!task) {
    /** this can't be... */
    throw new Error('task not foung in the state');
    return;
  }
  const apiModel: TaskModelUpdateType = {
    title: task.title,
    completed: task.completed,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
    ...domainModel,
  };
  todolistAPI.updateTask(toDoListId, id, apiModel)
    .then(res => {
      dispatch(updateTaskAC(id, toDoListId, domainModel));
    });
};


