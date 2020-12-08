import {addTodoListAction, RemoveTodoListAction, setTodoListType} from './todolist-reduser';
import {TaskStatuses, TaskType, todolistAPI} from '../api/todolist-api';
import {TasksStateType} from '../components/App/AppWithReduxs';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../common/utils/error-utils';

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTaskAC>
    | addTodoListAction
    | RemoveTodoListAction
    | setTodoListType
    | ReturnType<typeof setTasksAC>
    | setAppStatusType
    | setAppErrorType


let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todoListID]: action.tasks}
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.id)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASKS-STATUS': {
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => {
                        if (t.id !== action.id) {
                            return t
                        } else {
                            return {...t, status: action.status}
                        }
                    })
            }
        }
        case 'CHANGE-TASKS-TITLE': {
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
        case 'ADD-TODOLIST':
            return {...state, [action.todolistID]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todoListID: string) => {
    return {type: 'REMOVE-TASK', todoListID, id} as const
}

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListID: string) => ({
    type: 'CHANGE-TASKS-STATUS',
    id,
    status,
    todoListID
} as const)

export const changeTaskTitleAC = (id: string, title: string, todoListID: string) => ({
    type: 'CHANGE-TASKS-TITLE',
    id,
    title,
    todoListID
} as const)

export const setTasksAC = (todoListID: string, tasks: TaskType[]) => ({type: 'SET_TASKS', todoListID, tasks} as const)

export const fetchSetTasksTC = (todoListID: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todoListID).then(res => {
        dispatch(setTasksAC(todoListID, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const fetchRemoveTask = (todoListID: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todoListID, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todoListID))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


export const fetchAddTask = (title: string, todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const fetchChangeTaskTitle = (title: string, taskId: string, todoListId: string) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId]
    const currentTask = task.find(t => t.id === taskId)
    if (currentTask) {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTask(todoListId, taskId, {
            title: title,
            startDate: currentTask.startDate,
            priority: currentTask.priority,
            description: currentTask.description,
            deadline: currentTask.deadline,
            status: currentTask.status
        })
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC(taskId, title, todoListId))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}