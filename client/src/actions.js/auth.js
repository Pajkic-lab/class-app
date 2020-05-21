import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOG_OUT, PROFILE_ERROR, POST_ERROR } from "./types"
import setAuthToken from '../utils/setAuthToken'

//register
export const register= ({name, email, password, history}) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('./users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg)))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//login
export const login = ({email, password, history}) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error=> dispatch(setAlert(error.msg)))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//loadUser
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios('/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//logOut
export const logOut = ({history}) => dispatch => {
    dispatch({
        type: LOG_OUT
    })
    dispatch({
        type: PROFILE_ERROR
    })
    dispatch({
        type: POST_ERROR
    })
    history.push('/')
}