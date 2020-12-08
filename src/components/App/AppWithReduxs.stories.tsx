import React from 'react';
import AppWithRedux from './AppWithReduxs';
import {ReduxStoreProviderDecorator} from '../../state/ReduxStoreProviderDecorator';


export default {
    title: 'TodoList/AppWithReduxs',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],

};


export const AppWithReduxExampleBase = (props: any) => {
    return (<AppWithRedux />)
}