import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';

type ActionType = RemoveTodoListAction | addTodoListAction | ChangeTodoListTitleAction | ChangeTodoLisFilterAction

export type RemoveTodoListAction = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type addTodoListAction = {
    type: 'ADD-TODOLIST'
    title: string;
    todolistID: string
}

export type ChangeTodoListTitleAction = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoLisFilterAction = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterValueType
    id: string
}

export type filterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: filterValueType
}

let initialState: Array<TodolistDomainType> = []


export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType>  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodolistDomainType = {
                id: action.todolistID,
                filter: 'all',
                title: action.title,
                addedDate: '',
                order: 0
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER':
            let todoListfiltered = state.find(tl => tl.id === action.id)
            if (todoListfiltered) {
                todoListfiltered.filter = action.filter
                return [...state]
            }
            return state
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAction => {
  return   {type: 'REMOVE-TODOLIST', id : todoListID}
}

export const AddTodoListAC = (title: string): addTodoListAction => {
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}

export const ChangeTodoListTitleAC = (title: string, id: string):ChangeTodoListTitleAction => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title , id: id }
}

export const ChangeTodoLisFilterAC = (filter: filterValueType, id: string): ChangeTodoLisFilterAction => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: id }
}