import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {AddBox} from '@material-ui/icons';
import {RequestStatusType} from '../../../state/appReducer';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType

}


export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {

    console.log('AddItemForm')

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null)
        }
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
            />

            <IconButton size={'medium'} color={'primary'} onClick={addTask} disabled={props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        </div>
    )
})