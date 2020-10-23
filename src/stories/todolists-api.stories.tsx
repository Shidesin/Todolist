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


    // useEffect(() => {
    //
    //     const todolistId = '28b2e36a-9d16-4132-b554-a27c43db2d33    861d5b9d-3aee-496f-bfe6-0a972e1e447f';
    //     todolistAPI.deleteTodoLists(todolistId).then((res) => {
    //         setState(res.data.data);
    //     })
    // }, [])

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
        todolistAPI.updateTodoLists(todoListId, todoListTitle)
            .then((res) => {
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

export const updateTask = () => {
    const [state, setState] = useState<any>(null)

    const [todoListId, setTodoListId] = useState<string>('')

    const [taskId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskDescription, setTaskDescription] = useState<string>('')


    // const [taskStatus, setTaskStatus] = useState<number>(0)
    // const [taskPriority, setTaskPriority] = useState<number>(0)
    // const [taskStartDate, setTaskStartDate] = useState<string>('')
    // const [taskDeadline, setTaskDeadline] = useState<string>('')

    // useEffect(() => {
    //     const todolistId = '033a92c8-a89d-453d-9cef-3757fa652a88'
    //     const taskId = ''
    //     let newTitle = ''
    //     todolistAPI.updateTask(todolistId, taskId, {
    //         title: taskTitle,
    //         description: taskDescription,
    //         completed: taskCompleted,
    //         status: 0,
    //         priority: 0,
    //         startDate: '',
    //         deadline: ''
    //     }).then((res) => {
    //         debugger
    //         setState(res.data)
    //     })
    // }, [])

    const updateTask = () => {
        todolistAPI.updateTask(todoListId, taskId, {
            title: taskTitle,
            description: taskDescription,
            completed: false,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        }).then((res) => {
            debugger
            setState(res.data)
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}
                   type="text"/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)} type="text"/>
            <input placeholder={'title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}
                   type="text"/>
            <input placeholder={'description'} value={taskDescription}
                   onChange={e => setTaskDescription(e.currentTarget.value)} type="text"/>
            <button onClick={updateTask}>Update task</button>
        </div>
    )
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