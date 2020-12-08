import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../common/components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../api/todolist-api';

type TaskPropsType = {
    task: TaskType
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task called')

    const removeTask = useCallback (() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId])


    const changeStatus = useCallback  ((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneStatus = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneStatus ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId, props.changeStatus])


    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.task.id,props.changeTaskTitle, props.todolistId])



    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox color={'primary'}
                      onChange={changeStatus}
                      checked={props.task.status === TaskStatuses.Completed}
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