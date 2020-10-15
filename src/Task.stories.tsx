import React from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

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
            <Task task={{id: '1', isDone: true, title: 'CSS'}} removeTask={removeTask} todolistId={'todolist1'} changeStatus={changeStatus} changeTaskTitle={props.changeTaskTitle}/>
            <Task task={{id: '2', isDone: true, title: 'js'}} removeTask={removeTask} todolistId={'todolist2'} changeStatus={changeStatus} changeTaskTitle={props.changeTaskTitle}/>
        </div>
    )
}