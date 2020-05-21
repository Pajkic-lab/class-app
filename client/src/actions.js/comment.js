import axios from 'axios'
import { POST_ERROR, GET_POSTS } from './types'

//add comment
export const addComment = ({comment}, id) => async dispatch => {
    const body = {comment, id}
    try {
        const res = await axios.post('/posts/comment', body)
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR
        })
    }
}