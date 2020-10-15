import React from 'react';
import AppWithRedux from './AppWithReduxs';
import {Provider} from 'react-redux';
import {store} from './state/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


export default {
    title: 'TodoList/AppWithReduxs',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],

};


export const AppWithReduxExampleBase = (props: any) => {
    return (<AppWithRedux />)
}