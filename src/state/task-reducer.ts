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
import { TaskStateType } from "../App";

const toDoListId_01 = v1()

const initialState = {
    [toDoListId_01]: [{id: v1(), title: 'Check mail ;)', isDone: false}]
}

type AddTaskActionType = { type: 'ADD_TASK', title: string, toDoListId: string }
type RemoveTaskActionType = { type: 'REMOVE_TASK', id: string, toDoListId: string }

type ActionType = AddTaskActionType | RemoveTaskActionType

export const addTaskAC = (title: string, toDoListId: string): AddTaskActionType => ({type: 'ADD_TASK', title, toDoListId})
export const removeTaskAC = (id: string, toDoListId: string): RemoveTaskActionType => ({type: 'REMOVE_TASK', id, toDoListId})

export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD_TASK':
            return {...state, [action.toDoListId]: [ {id: v1(), title: action.title, isDone: false} , ...state[action.toDoListId]]}
        case 'REMOVE_TASK':
            return {...state, [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.id)}
        default:
            return state
    }
}


