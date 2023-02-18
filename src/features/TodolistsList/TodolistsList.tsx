import React, {useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer'
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from "react-router-dom";
import {PaperCss} from "../../utils/style-for-mui/style-for-mui";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {Task} from "./Todolist/Task/Task";


export const TodolistsList: React.FC = () => {
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()


    const [characters, updateCharacters] = useState(todolists);


    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items)
        /*  dispatch(updateTaskTC(items))*/
    }

    useEffect(() => {

        if (isLogin) {
            const thunk = fetchTodolistsTC()
            dispatch(thunk)
        }


    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    useEffect(() => {
        updateCharacters(todolists)
    }, [todolists])

    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        {todolists.length!=0
            ? <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable type="COLUMN" direction="horizontal" droppableId="characters">
                    {(provided) => (
                        <Grid  container sx={{justifyContent:'center'}} spacing={6} {...provided.droppableProps}
                               ref={provided.innerRef}>
                            {characters.map((el, index) => {
                                let allTodolistTasks = tasks[el.id]
                                return (
                                    <Draggable key={el.id} draggableId={el.id} index={index}>
                                        {(provided) => (

                                            <Grid item key={el.id}
                                                  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <PaperCss>
                                                    <Todolist
                                                        todolist={el}
                                                        tasks={allTodolistTasks}
                                                        removeTask={removeTask}
                                                        changeFilter={changeFilter}
                                                        addTask={addTask}
                                                        changeTaskStatus={changeStatus}
                                                        removeTodolist={removeTodolist}
                                                        changeTaskTitle={changeTaskTitle}
                                                        changeTodolistTitle={changeTodolistTitle}
                                                    />
                                                </PaperCss>
                                            </Grid>

                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
            :<div className={'empty'}>
                Your list is empty
            </div>}




    </>
}
