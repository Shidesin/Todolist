import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from './state/store';
import {tasksReducer} from './state/tasks-reduser';
import {todoListReducer} from './state/todolist-reduser';
import {TaskPriorities, TaskStatuses} from './api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,todoListId: "todolistId1",startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New,todoListId: "todolistId1",startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New,todoListId: "todolistId2",startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.New,todoListId: "todolistId2",startDate: '',deadline: '', addedDate: '', order: 0,priority: TaskPriorities.Low, description: ''}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)