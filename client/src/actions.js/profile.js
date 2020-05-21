import axios from 'axios'
import { PROFILE_CREATED, PROFILE_ERROR, GET_PROFILE, GET_PROFILES, DELETE_ACCOUNT, CLEAR_PROFILE, POST_ERROR, CLEAR_CURRENT } from '../actions.js/types'
import { setAlert } from './alert'

//createProfile && update
export const createProfile = ({bio, aboutme}) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = JSON.stringify({bio, aboutme})

    try {
        const res = await axios.post('/profile', body, config)
        dispatch({
            type: PROFILE_CREATED,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg)))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: errors
        })
    }
}

//getProfile
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//getProfiles
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete account and profile
export const deleteAccount= ({history}) => async dispatch => {
    if (window.confirm('Are you sure?')){
        try {
            await axios.delete('/profile')
            dispatch({
                type: DELETE_ACCOUNT
            })
            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: POST_ERROR
            })
            dispatch({
                type: CLEAR_CURRENT
            })
            dispatch(setAlert('YOUR ACCOUNT IS DELETED'))
            history.push('/')
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                //payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}



