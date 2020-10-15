import React from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,

};


export const AddItemFormExampleBase = (props: any) => {
    return (
        <AddItemForm addItem={ action('Button inside form clicked')}/>
    )
}