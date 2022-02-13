import {v1} from 'uuid';
import { TodoListType } from '../../api/todolist-api';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodolistsAC,
    todoListReducer
} from './todolist-reducer';
import {FilterType, ToDoListDomainType } from './todolist-reducer.types';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const newTodolist = {id: '1', title: 'New Todolist', filter: 'all', addedDate: '', order: 0}

    const endState = todoListReducer(startState, addTodoListAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todoListReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterType = 'completed';

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todoListReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists shold be set to the state', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0}
    ]

    const action = setTodolistsAC(startState)
    const endState = todoListReducer([], action)

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
})
