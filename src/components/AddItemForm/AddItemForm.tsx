import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import {CustomTextField} from '../../utils/style-for-mui/style-for-mui';
import {InputAdornment} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <>
        <CustomTextField
            disabled={disabled}
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="New task"
            helperText={error}
            InputProps={{
                endAdornment: (
                    <IconButton onClick={addItemHandler} disabled={disabled}>
                        <PlaylistAddIcon style={{color: '#a9a9a9'}}/>
                    </IconButton>

                ),
            }}
        />

    </>
})
