import React, {useCallback, useEffect, useState} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import s from '../TodoList.module.css'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
import {fetchTasksTC, updateTaskTC} from '../tasks-reducer'
import {useAppDispatch} from "../../../app/store";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {CustomButton} from "../../../utils/style-for-mui/style-for-mui";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}


export const Todolist = React.memo(function ({...props}: PropsType) {

    const {todolist,tasks,changeFilter,addTask,changeTaskStatus,changeTaskTitle,removeTask,removeTodolist,changeTodolistTitle}=props

    const [characters, updateCharacters] = useState(tasks);

    const dispatch = useAppDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(todolist.id)
        dispatch(thunk)
    }, [])

    const handleAddTask = useCallback((title: string) => {
        addTask(title, todolist.id)
    }, [addTask,todolist.id])

    const handleRemoveTodolist = () => {
        removeTodolist(todolist.id)
    }
    const handleChangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [todolist.id, changeTodolistTitle])

    const onAllClickHandler = useCallback(() => changeFilter('all', todolist.id), [todolist.id, changeFilter])
    const onActiveClickHandler = useCallback(() => changeFilter('active', todolist.id), [todolist.id, changeFilter])
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todolist.id), [todolist.id, changeFilter])


    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items)
      /*  dispatch(updateTaskTC(items))*/
    }

    useEffect(() => {
        updateCharacters(tasks)
        if (todolist.filter === 'active') {
            updateCharacters(tasks.filter(t => t.status === TaskStatuses.New))
        }
        if (todolist.filter === 'completed') {
            updateCharacters(tasks.filter(t => t.status === TaskStatuses.Completed))
        }

    }, [tasks,todolist.filter])
    return <>

        <div className={s.headerContainer}>
            <EditableSpan value={todolist.title} onChange={handleChangeTodolistTitle}/>
            <IconButton onClick={handleRemoveTodolist} disabled={todolist.entityStatus === 'loading'}>
                <DeleteOutlineIcon style={{color: '#c77789',width:'15px',height:'15px'}}/>
            </IconButton>
        </div>
        <AddItemForm addItem={handleAddTask} disabled={todolist.entityStatus === 'loading'}/>
        <div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {characters.map((el, index) => {
                                return (
                                    <Draggable key={el.id} draggableId={el.id} index={index}>
                                        {(provided) => (
                                            <div style={{background:'pink'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Task key={el.id} task={el} todolistId={todolist.id}
                                                      removeTask={removeTask}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTaskStatus={changeTaskStatus}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        <div style={{paddingTop: '10px'}}>
            <CustomButton variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                          onClick={onAllClickHandler}>All
            </CustomButton>
            <CustomButton variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                          onClick={onActiveClickHandler}>Active
            </CustomButton>
            <CustomButton variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                          onClick={onCompletedClickHandler}>Completed
            </CustomButton>


        </div>
    </>
})


