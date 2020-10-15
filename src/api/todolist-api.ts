import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8ec03155-8ce5-469f-8e80-164464cd89ef'
    }
})

type CreateTodoResponceType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}

type DeleteAndUpdateTodoResponceType = {
    resultCode: number
    fieldsError: Array<string>
    messages: Array<string>,
    data: {}
}


type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type CommonResponceType<T = {}> = {
    resultCode: number
    fieldsError: Array<string>
    messages: Array<string>,
    data: T
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodoLists(title: string) {
        return instance.post<CommonResponceType<{item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodoLists(todolistId: string) {
        return instance.delete<CommonResponceType>(`todo-lists/${todolistId}`)
    },
    updateTodoLists(todolistId: string, title: string) {
        return instance.put<CommonResponceType>(`todo-lists/${todolistId}`, {title})
    }
}