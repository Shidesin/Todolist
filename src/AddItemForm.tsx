import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    };

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Titile is required')
        }
    };

    return (
        <div>
            <TextField
                error={!!error}
                helperText={error}
                label={'Title'}
                variant={'standard'}
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                //className={error ? 'error' : ''}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton size={'medium'} color={'primary'} onClick={addTask}>
                <AddBox/>
            </IconButton>
            {/*<Button variant={'contained'}*/}
            {/*        color={'primary'}*/}
            {/*        size={'small'}*/}
            {/*        onClick={addTask}*/}
            {/*>*/}
            {/*    add*/}
            {/*</Button>*/}
            {/*<button onClick={addTask}>+</button>*/}
            {/*{error && <div className={'error_message'}>{error}</div>}*/}
        </div>
    )
}