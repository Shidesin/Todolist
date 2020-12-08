import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8ec03155-8ce5-469f-8e80-164464cd89ef'
    }
})

type ResponseTasksType = {
    error: string
    items: TaskType[]
    totalCount: number
}

export type TaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string,
    deadline: string,
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type CommonResponceType<D = {}> = {
    resultCode: number
    fieldsError: Array<string>
    messages: Array<string>,
    data: D
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<CommonResponceType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodoLists(todolistId: string) {
        return instance.delete<CommonResponceType>(`todo-lists/${todolistId}`)
    },
    updateTodoLists(todolistId: string, title: string, model: TodolistType) {
        return instance.put<CommonResponceType>(`todo-lists/${todolistId}`, model)
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<CommonResponceType<{item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    }
}