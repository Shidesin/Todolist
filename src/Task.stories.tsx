import React from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from './api/todolist-api';

export default {
    title: 'TodoList/Task',
    component: Task,

};

let removeTask = action('removeTask')
let changeStatus = action('changeStatus')
let changeTaskTitle = action('changeTaskTitle')

export const TaskExampleBase = (props: any) => {
    return (
        <div>
            <Task task={{id: '1', title: 'CSS', status: TaskStatuses.New,todoListId: 'todolistID2',startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''}} removeTask={removeTask} todolistId={'todolist1'} changeStatus={changeStatus} changeTaskTitle={props.changeTaskTitle}/>
            <Task task={{id: '2', title: 'js',status: TaskStatuses.New,todoListId: 'todolistID2',startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''}} removeTask={removeTask} todolistId={'todolist2'} changeStatus={changeStatus} changeTaskTitle={props.changeTaskTitle}/>
        </div>
    )
}