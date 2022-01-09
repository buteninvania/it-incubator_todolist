// /****************** Tasks Store *************/
//
// const [tasks, setTasks] = useState<TaskStateType>({
//     [toDoListId_01]: [{id: v1(), title: 'Check mail ;)', isDone: false}],
// })
//
// const addTask = (title: string, toDoListId: string) => {
//     const newTask = {id: v1(), title, isDone: false}
//     const copyState = {...tasks}
//     copyState[toDoListId] = [newTask, ...tasks[toDoListId]]
//     setTasks(copyState)
// }
// const removeTask = (id: string, toDoListId: string) => {
//     tasks[toDoListId] = tasks[toDoListId].filter(t => t.id !== id)
//     setTasks({...tasks})
// }
// const changeIsDoneTask = (id: string, toDoListId: string) => {
//     const copyState = {...tasks}
//     copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {...t, isDone: !t.isDone} : t)]
//     setTasks(copyState)
// }
// const changeTaskTitle = (id: string, toDoListId: string, title: string) => {
//     const copyState = {...tasks}
//     copyState[toDoListId] = [...tasks[toDoListId].map(t => t.id === id ? {...t, title} : t)]
//     setTasks(copyState)
// }
//
// /*************************************************/

import { v1 } from "uuid";
import {AddTaskActionType, ChangeIsDoneTaskActionType, ChangeTaskTitleActionType, RemoveTaskActionType,
    TaskActionType, TaskStateType } from "./task-reducer.types";

const toDoListId_01 = v1()

const initialState: TaskStateType = {
    [toDoListId_01]: [{id: v1(), title: 'Check mail ;)', isDone: false}]
}

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => ({type: 'ADD_TASK', title, toDoListId})
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskActionType => ({type: 'REMOVE_TASK', id, toDoListId})
export const changeIsDoneTaskAC = (id: string, toDoListId: string): ChangeIsDoneTaskActionType => ({type: 'CHANGE_IS_DONE_TASK', id, toDoListId})
export const changeTaskTitleAC = (id: string, toDoListId: string, title: string): ChangeTaskTitleActionType => ({type: 'CHANGE_TASK_TITLE', id, toDoListId, title})

export const taskReducer = (state: TaskStateType, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.toDoListId]: [ {id: v1(), title: action.title, isDone: false} , ...state[action.toDoListId]]}
        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id)}
        case 'CHANGE_IS_DONE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {...t, isDone: !t.isDone} : t)}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.id ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}


