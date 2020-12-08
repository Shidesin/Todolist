import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {RequestStatusType, setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from './appReducer';

type ActionType =
    RemoveTodoListAction
    | addTodoListAction
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoLisFilterAC>
    | setTodoListType
    | setAppStatusType
    | setAppErrorType
    | changeTodolistEntityStatusType


export type RemoveTodoListAction = ReturnType<typeof RemoveTodoListAC>

export type addTodoListAction = ReturnType<typeof AddTodoListAC>

export type setTodoListType = ReturnType<typeof setTodoListAC>

export type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

export type filterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: filterValueType,
    entityStatus: RequestStatusType
}

let initialState: Array<TodolistDomainType> = []


export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.todolists.map(tl => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistID,
                filter: 'all',
                title: action.title,
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.entityStatus}: tl)
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', id: todoListID} as const)

export const AddTodoListAC = (title: string, todolistID: string) => ({type: 'ADD-TODOLIST', title, todolistID} as const)


export const changeTodolistEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistID, entityStatus} as const)

export const ChangeTodoListTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    id: id
} as const)

export const ChangeTodoLisFilterAC = (filter: filterValueType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id: id
} as const)

export const setTodoListAC = (todolists: TodolistType[]) => ({type: 'SET_TODOLISTS', todolists} as const)

export const fetchGetTodoListThunk = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const fetchRemoveTodoList = (todoListID: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
    todolistAPI.deleteTodoLists(todoListID)
        .then(res => {
            dispatch(RemoveTodoListAC(todoListID))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const fetchAddTodoList = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodoLists(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(AddTodoListAC(title, res.data.data.item.id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (res.data.messages.length > 0) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error'))
            }
        }
    })
}

export const fetchCnageTodoListTitle = (todoListID: string, title: string) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    const todolist = getState().todolists
    const currentTodoList = todolist.find(tl => tl.id === todoListID)
    if (currentTodoList) {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
        todolistAPI.updateTodoLists(todoListID, title, {
            order: currentTodoList.order,
            addedDate: currentTodoList.addedDate,
            id: currentTodoList.id,
            title: title
        }).then(res => {
            dispatch(ChangeTodoListTitleAC(title, todoListID))
            dispatch(changeTodolistEntityStatusAC(todoListID, 'succeeded'))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}