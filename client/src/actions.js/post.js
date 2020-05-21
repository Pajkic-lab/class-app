import axios from "axios"
import { CREATE_POST, POST_ERROR, GET_POSTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_POSTS } from '../actions.js/types'
//import { setAlert } from "./alert"

//create post
export const addPost = ({text}) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = JSON.stringify({text})
    try {
        const res = await axios.post('/posts', body, config)
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
        //dispatch(setAlert('post created'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete post
export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete('posts', { data: {id} } )
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        
    }
}

//set current
export const setCurrent = (id, text) => dispatch => {
    dispatch({
        type: SET_CURRENT,
        payload: {id, text}
    })
}

//clear current
export const clearCurrent = () => dispatch => {
    dispatch({
        type: CLEAR_CURRENT
    })
}

//update post
export const updatePost = ({text}, id) => async dispatch => {
    const config = {headers: {'Content-Type': 'application/json'}}
    const body = ({text, id})
    try {
        const res = await axios.put('/posts', body, config)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        
    }
}

//get all posts
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts/all')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//clear posts
export const clearPosts = () => dispatch => {
    dispatch({
        type: CLEAR_POSTS
    })
}