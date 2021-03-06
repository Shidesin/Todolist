import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from './store';
import {tasksReducer} from './tasks-reduser';
import {todoListReducer} from './todolist-reduser';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus:'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus:'idle'}
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
    },
    app: {
        status: 'idle',
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)