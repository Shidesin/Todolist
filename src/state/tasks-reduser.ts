import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListAction, RemoveTodoListAction} from './todolist-reduser';

type ActionType = RemoveTaskAction | addTaskAction | changeTaskStatusType | changeTaskTitleType | addTasksType | addTodoListAction | RemoveTodoListAction

export type RemoveTaskAction = {
    type: 'REMOVE-TASK'
    id: string
    todoListID: string
}
export type addTaskAction = {
    type: 'ADD-TASK'
    title: string;
    todoListID: string
}
export type changeTaskStatusType = {
    type: 'CHANGE-TASKS-STATUS'
    id: string
    isDone: boolean
    todoListID: string
}

export type changeTaskTitleType = {
    type: 'CHANGE-TASKS-TITLE'
    id: string
    title: string
    todoListID: string
}

export type addTasksType = {
    type: 'ADD_TASKS'
}




export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todoListID]
            copyState[action.todoListID] = todoListTasks.filter(t => t.id !== action.id)
            return copyState
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let copyState = {...state}
            let todoListTasks = copyState[action.todoListID]
            let newTodoListTasks = [newTask, ...todoListTasks]
            return {...copyState, [action.todoListID]: newTodoListTasks}
        }
        case 'CHANGE-TASKS-STATUS': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => {
                        if (t.id !== action.id) {
                            return t
                        } else {
                            return {...t, isDone: action.isDone}
                        }
                    })
            }
        }
        case 'CHANGE-TASKS-TITLE':{
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => {
                        if (t.id !== action.id) {
                            return t
                        } else {
                            return {...t, title: action.title}
                        }
                    })
            }
        }
        case 'ADD-TODOLIST':{
            return {
                ...state, [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST':{
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            throw new Error('I do not understand this action type')
    }
}

export const removeTaskAC = (id: string, todoListID: string): RemoveTaskAction => {
    return {type: 'REMOVE-TASK', todoListID: todoListID, id: id}
}

export const addTaskAC = (title: string, todoListID: string): addTaskAction => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusType => {
    return {type: 'CHANGE-TASKS-STATUS', id, isDone, todoListID}
}

export const changeTaskTitleAC = (id: string, title: string, todoListID: string): changeTaskTitleType => {
    return {type: 'CHANGE-TASKS-TITLE', id, title, todoListID}
}

export const addTasksAC = (): addTasksType => {
    return {type: 'ADD_TASKS'}
}