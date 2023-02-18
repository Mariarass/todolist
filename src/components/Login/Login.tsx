import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {loginTC} from "../../features/Login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import s from './Login.module.css'
// @ts-ignore
import video from '../../assets/login.mp4'
import {
    CustomButton,
    CustomCheckbox,
    CustomFormControlLabel,
    CustomTextField
} from '../../utils/style-for-mui/style-for-mui';

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Field should be more 3 symbol'
            }

            return errors
        },
        onSubmit: values => {

            dispatch(loginTC(values))
            formik.resetForm()
        },
    });


    if (isLogin) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'} sx={{marginTop: 20}}>
        <Grid item>
            <video loop={true} autoPlay={true} muted={true} id="myVideo" className={s.video}>
                <source src={video} type="video/mp4"/>
            </video>
        </Grid>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <h3 className={s.header}>Welcome to my todolist!</h3>
                    <p className={s.text}>Use common test account credentials:
                        <br/>Email: free@samuraijs.com
                        <br/>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>

                        <CustomTextField label="Email" margin="normal"

                                         helperText={formik.errors.email}
                                         {...formik.getFieldProps('email')}/>

                        <CustomTextField type="password" label="Password"
                                         margin="normal"
                                         helperText={formik.errors.password}
                                         {...formik.getFieldProps('password')}
                        />

                        <CustomFormControlLabel label={'Remember me'} control={<CustomCheckbox
                            {...formik.getFieldProps('rememberMe')}/>}
                                          checked={formik.values.rememberMe}/>


                        <CustomButton type={'submit'} variant={'outlined'}>
                            Login
                        </CustomButton>


                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}