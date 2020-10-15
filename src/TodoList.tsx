import React, {useCallback} from 'react';
import {filterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodoListType} from './AppWithReduxs';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: filterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    filter: filterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
}


const TodoList = React.memo(function (props: PropsType) {

    let todolst = useSelector<AppRootStateType, TodoListType | undefined>(state => state.todolists.find(todo => {
        return todo && todo.id === props.id
    }))

    const changetodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.id, props.changeFilter])
    const onComplitedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.id, props.changeFilter])


    let tasksToDoList: Array<TaskType> = props.tasks
    if (props.filter === 'active') {
        tasksToDoList = tasksToDoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksToDoList = tasksToDoList.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changetodoListTitle}/>
                <IconButton size={'small'} onClick={() => {
                    props.removeTodoList(props.id)
                }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    props.tasks.map(task => <Task
                        key={task.id}
                        task={task}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        todolistId={props.id}
                    />)
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        size={'small'}
                        onClick={onAllClickHandler}>All</Button>

                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={props.filter === 'active' ? 'primary' : 'default'}
                        size={'small'}
                        onClick={onActiveClickHandler}>Active</Button>

                <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                        color={props.filter === 'completed' ? 'primary' : 'default'}
                        size={'small'}
                        onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

export default TodoList;