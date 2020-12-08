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
    const [todoListTitle, setTodoListTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const CreateTD = () => {
        todolistAPI.createTodoLists(todoListTitle).then((res) => {
            setState(res.data.data.item);
        })
    }

    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <input type="text" placeholder={'Title todoList'} value={todoListTitle} onChange={(e) => {
                setTodoListTitle(e.currentTarget.value)
            }}/>
            <button onClick={CreateTD}>Add TodoList</button>
        </div>)
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    

    const deleteTodolist = () => {
        todolistAPI.deleteTodoLists(todoListId).then((res) => {
            setState(res.data.data);
        })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todoListId} onClick={() => {
        }} onChange={event => setTodoListId(event.currentTarget.value)} type="text"/>
        <button onClick={deleteTodolist}>Delete TosoList</button>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [todoListId, setTodoListId] = useState<string>('')
    const [todoListTitle, setTodoListTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const updateTodoListTitle = () => {
        todolistAPI.updateTodoLists(todoListId, todoListTitle, {
            order: 0,
            addedDate: '',
            id: todoListId,
            title: todoListTitle
        }).then(res => {
                setState(res.data.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={'Todolist ID'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}
               type="text"/>
        <input placeholder={'Todolist title'} value={todoListTitle}
               onChange={e => setTodoListTitle(e.currentTarget.value)} type="text"/>
        <button onClick={updateTodoListTitle}>Update</button>

    </div>
}

export const getTasks = () => {
    const [todoListId, setTodoListId] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const getTask = () => {
        todolistAPI.getTasks(todoListId).then((res) => {
            setState(res.data.items)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'Todolist ID'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}
                   type="text"/>
            <button onClick={getTask}>getTasks</button>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('descripton 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value) }}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value) }}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => { setTitle(e.currentTarget.value)}}/>
            <input placeholder={'Description'} value={description} onChange={(e) => { setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} type="number" onChange={(e) => { setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} type="number" onChange={(e) => { setPriority(+e.currentTarget.value)}}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const deleteTask = () => {
        todolistAPI.deleteTask(todoListId, taskId).then((res) => {
            setState(res.data);
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}
                   type="text"/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)} type="text"/>
            <button onClick={deleteTask}>Delete task</button>
        </div>)
}

export const CreateTask = () => {
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const createTask = () => {
        todolistAPI.createTask(todoListId, taskTitle).then((res) => {
            setState(res.data);
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}
                   type="text"/>
            <input type="text" placeholder={'Title task'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Add task</button>
        </div>)
}