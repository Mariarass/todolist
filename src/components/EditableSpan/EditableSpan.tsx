import React, {ChangeEvent, useState} from 'react';
import s from './EditableSpan.module.css'
import {CustomTextField} from "../../utils/style-for-mui/style-for-mui";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    const {value,onChange}=props

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <CustomTextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <div className={s.container}>
            <span className={s.header} onDoubleClick={activateEditMode}>{value}</span>
            <IconButton onClick={activateEditMode}>
                <EditIcon style={{color: '#7f9f73',width:'15px',height:'15px'}}/>
            </IconButton>
        </div>
});
