import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, AuthType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setIsInitialInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC, setIsInitialInAC} = slice.actions

/*export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIAL-IN': {
            return {
                ...state, isInitialized: action.value
            }
        }
        default:
            return state
    }
}*/
// actions
/*
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitialInAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIAL-IN', value} as const)
*/

// thunks
export const loginTC = (data: AuthType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data).then((res) => {
        console.log(res)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))

        } else {
            handleServerAppError(res.data, dispatch)

        }

    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me().then(res => {

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setIsInitialInAC({value:true}))

        } else {
            console.log('fa;sr')
            dispatch(setIsInitialInAC({value:true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        }
    })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsInitialInAC>