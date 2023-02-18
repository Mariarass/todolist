import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {CustomCheckbox} from '../../../../utils/style-for-mui/style-for-mui';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const {task,todolistId,changeTaskStatus,changeTaskTitle,removeTask}=props

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : 'task'}>
        <div style={{display: 'flex', alignItems: 'center',width:'100%'}}>
            <CustomCheckbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        </div>
        <div>

            <IconButton onClick={onClickHandler}>
                <DeleteOutlineIcon style={{color: '#c77789',width:'15px',height:'15px'}}/>
            </IconButton>
        </div>


    </div>
})
