import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {


    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInit = useAppSelector(state => state.auth.isInitialized)
    const isLog = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {

        dispatch(initializeAppTC())

    }, [])
    const logOutHandler = () => {
        dispatch(logoutTC())
    }


    if (!isInit) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static" sx={{background: '#363639', boxShadow: 'none'}}>
                <Toolbar>
                    {isLog && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#e3ce7b',
                    },
                }}/>}
            </AppBar>

            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h3>404 page non found</h3>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>

        </div>
    )
}

export default App
