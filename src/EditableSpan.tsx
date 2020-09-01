import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string,
    changeValue?: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activatedEditMode = () => {
        setEditMode(true);
    };

    const deActivatedEditMode = () => {
        setEditMode(false);
        if (title !== '') {
            if (props.changeValue) {
                props.changeValue(title)
            }
        } else {
            setTitle(props.value)
        }

    };

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            size={'small'}
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={onChangeTitle}
        />
        :
    <span onDoubleClick={activatedEditMode}>{props.value}</span>;


}