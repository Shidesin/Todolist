import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}


let settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8ec03155-8ce5-469f-8e80-164464cd89ef'
    }
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodoLists().then((res) => {

            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let title = 'CreateNewTodoList'
        todolistAPI.createTodoLists(title).then((res) => {
            setState(res.data.data.item);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '7579ade4-96c8-4a81-a80a-12052f6900ac';
        todolistAPI.deleteTodoLists(todolistId).then((res) => {
            setState(res.data.data);
        })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'IncubatorR'

        const todolistId = '033a92c8-a89d-453d-9cef-3757fa652a88'
        todolistAPI.updateTodoLists(todolistId, title)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
