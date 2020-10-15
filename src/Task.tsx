import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';

type TaskPropsType = {
    task: TaskType
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task called')

    const removeTask = useCallback (() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])
    const changeStatus = useCallback  ((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneStatus = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneStatus, props.todolistId)
    }, [props.task.id, props.todolistId, props.changeStatus])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.task.id,props.changeTaskTitle, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox color={'primary'}
                      onChange={changeStatus}
                      checked={props.task.isDone}
            />
            <EditableSpan
                changeValue={changeTaskTitle}
                value={props.task.title}
            />
            <IconButton size={'small'} onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})