import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,

};


export const EditableSpanExampleBase = (props: any) => {
    return (
        <EditableSpan  value={'value'} changeValue={() => action('action!')}/>
    )
}