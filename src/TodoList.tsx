import React, {ChangeEvent} from 'react';
import {filterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: filterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    filter: filterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

function TodoList(props: PropsType) {

    const changetodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    };
    const onComplitedClickHandler = () => {
        props.changeFilter('completed', props.id)
    };

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changetodoListTitle}/>
                <IconButton size={'small'} onClick={() => {
                    props.removeTodoList(props.id)
                }}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={() => {props.removeTodoList(props.id)}} > X </button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    props.tasks.map(task => {

                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneStatus = e.currentTarget.checked;
                            props.changeStatus(task.id, newIsDoneStatus, props.id)
                        }

                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <Checkbox color={'primary'}
                                          onChange={changeStatus}
                                          checked={task.isDone}
                                />
                                <EditableSpan
                                    changeValue={changeTaskTitle}
                                    value={task.title}
                                />
                                <IconButton size={'small'} onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                                {/*<button onClick={removeTask}>x</button>*/}
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        size={'small'}
                        // className={props.filter === 'all' ? 'active_filter' : ''}
                        onClick={onAllClickHandler}>All</Button>

                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        color={props.filter === 'active' ? 'primary' : 'default'}
                        size={'small'}
                        // className={props.filter === 'active' ? 'active_filter' : ''}
                        onClick={onActiveClickHandler}>Active</Button>

                <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                        color={props.filter === 'completed' ? 'primary' : 'default'}
                        size={'small'}
                        // className={props.filter === 'completed' ? 'active_filter' : ''}
                        onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;